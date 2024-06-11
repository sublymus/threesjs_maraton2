
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

select * from user_stores;
select * from users;