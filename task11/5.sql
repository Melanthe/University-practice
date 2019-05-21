select Users.* from Users, Posts where Users.Id = Posts.User_id 
group by Users.Id 
having count(Posts.User_id) > 3;