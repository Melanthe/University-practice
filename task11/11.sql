select datediff(curdate(), Creation_date) as DAYS_AGO
from Posts where Creation_date = (SELECT Creation_date from Posts order by Creation_date limit 1);