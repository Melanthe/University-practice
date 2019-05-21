select Users.Nickname, Posts.Description, Posts.Creation_date FROM Users, Posts
where Users.Id = Posts.User_id  and Users.Id = 2
order by Posts.Creation_date ASC;