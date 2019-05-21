select Posts.Post_id, Posts.Description,  Posts.Creation_Date, Users.NickName
FROM Posts
inner join Users on Users.Id = Posts.User_id
group by Posts.Description
having length(Posts.Description) > 4;