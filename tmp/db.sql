
-- select * from `discussions`
--  where (
--     `creator_id` = '95c6be75-79c3-4f9e-b684-599f00fef969' 
--     and 
--     `receiver_id` = '67caf0c6-53dd-4948-a6ad-07cd5a3f3c0e'
--     ) 
-- or 
-- (`creator_id` = '67caf0c6-53dd-4948-a6ad-07cd5a3f3c0e' and `receiver_id` = '95c6be75-79c3-4f9e-b684-599f00fef969') and `table_name` = 'm_c' and `table_id` = 'b5b40cb3-29b1-4ada-9aa4-7e26614d6a36' order by `updated_at` desc;
    
-- select * from discussions;
-- select * from messages;

-- delete from  discussions;
-- delete from  messages;

-- select * from user_stores;
-- select * from users;

--  select * from `user_stores` where `email` = 'lil@gmail.com' and `type` = 'COLLABORATOR' limit 1 - no such column: email;

--  select *, `stores`.`id` as `id`, `stores`.`name` as `name`, `users`.`name` as `owner_name`, `users`.`id` as `owner_id`, `users`.`email` as `owner_email`, `users`.`created_at` as `user_created_at` from `stores` left join `users` on `users`.`id` = `owner_id` where `owner_id` = '67caf0c6-53dd-4948-a6ad-07cd5a3f3c0e', '67caf0c6-53dd-4948-a6ad-07cd5a3f3c0e' and `stores`.`id` like '%b5b40cb3-29b1-4ada-9aa4-7e26614d6a36%';


-- select * from products;

--  insert into `roles` (`chat_client`, `created_at`, `filter_client`, `filter_collaborator`, `filter_command`, `filter_product`, `id`, `manage_command`, `name`, `store_id`, `updated_at`) values (true, '2024-06-16 08:45:52', true, true, true, true, '13e4c464-8456-4f92-816b-57afe7b11cb7', true, 'Customer service', 8, '2024-06-16 08:45:52') ;

select * from products ;