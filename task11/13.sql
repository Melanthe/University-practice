select Nickname from Users 
inner join Posts on Posts.User_id = Users.Id
where date(Creation_date) = curdate()
group by Users.Id 
having count(Posts.Post_id) > 3;