select Nickname, sum(case when date(Creation_date) = '2019-05-09' then 1 else 0 end) as Number_of_Posts
from Users left join Posts
on Posts.User_id = Users.Id
group by Users.Id;