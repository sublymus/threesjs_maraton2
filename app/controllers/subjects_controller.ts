import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import Subject from '#models/subject';
// import transmit from '@adonisjs/transmit/services/main';
import db from '@adonisjs/lucid/services/db';
import { limitation } from './Tools/Utils.js';
import UserStore from '#models/user_store';
import User from '#models/user';

export default class SubjectsController {
    async create_subject({ request, auth }: HttpContext) {
        const { message, title, isPrivate, targs, close } = request.body();
        const user = await auth.authenticate();
        const id = v4();
        const files = await createFiles({
            request,
            column_name: 'files',
            table_id: id,
            table_name: 'subjects',
            options: {
                throwError: true
            }
        });
        const subject = await Subject.create({
            id,
            close: close && Number(close),
            files: JSON.stringify(files),
            message,
            title,
            isPrivate,
            targs,
            user_id: user.id,
        });
        const newSubject = {
            ...Subject.parseSubject(subject),
            id
        }
        return newSubject
    }
    async get_subjects({ request }: HttpContext) {
        const { page, limit, order_by, subject_id, title, message, isPrivate, targ_name, close, text ,user_id} = request.qs();
        let query = db.query()
            .from(Subject.table)
            .select('*');
        if (subject_id) {
            return (await query.where('id', subject_id)).map(p => Subject.parseSubject(p));
        }
        
        if (text) {
            const like = `%${(text as string).trim()}%`;
            query = query.andWhere((q) => {
                q.whereLike('title', like)
                    .orWhereLike('message', like)
            });
        }
        if (user_id) {
            query = query.andWhere('user_id', user_id)
        }
        if (title) {
            query = query.andWhereLike('title', `%${title}%`)
        }
        if (message) {
            query = query.andWhereLike('message', `%${message}%`)
        }
        if (isPrivate) {
            query = query.andWhereNotNull('is_private')
        }
        if (targ_name) {
            query = query.andWhereLike('targs', `%${targ_name}%`)
        }
        if (close) {
            query = query.andWhere('close', close)
        }
        const l = await limitation(query, page, limit, order_by);
        const s = (await l.query).map(p => Subject.parseSubject(p)).map(subject => new Promise(async (rev) => {
            const user = await User.find(subject.user_id)
            if (!user) return rev(null);
            let t : any = []
             try {
               t=  JSON.parse(subject.targs)
            } catch (error) {}
            rev({
                ...subject,
                user: User.ParseUser(user),
                targs:t
            });
        }));
        return {
            ...l.paging,
            list: (await Promise.allSettled(s)).filter(f => (f as any).value).map(m => (m as any).value),
        }
    }

    async delete_subject({ request, auth }: HttpContext) {
        const subject_id = request.param('id');
        const user = await auth.authenticate();

        const subject = await Subject.findOrFail(subject_id);

        if ((user.id == subject.user_id) || await UserStore.isSublymusManager(user.id)) {
            await subject.delete();
        }

        return {
            delete: subject.$isDeleted
        }
    }
}