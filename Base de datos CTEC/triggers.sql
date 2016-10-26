create function stage_id() returns trigger as $stage_id$
	begin 
		if NEW.id <= 18 then
			raise exception 'This stage cant be update it or delete it';
		else 
			return NEW;
		end if;
	end;
	$stage_id$ language plpgsql;

create trigger stage_id before update or delete on stage
	for each row EXECUTE PROCEDURE stage_id();
	
create function checkDate() returns trigger as $checkDate$
	begin 
		if ((select cast(split_part(NEW.start_day, '-', 1) as int)) < (select cast(split_part(NEW.finish_day, '-', 1) as int))) and
			(select cast(split_part(NEW.start_day, '-', 2) as int)) = (select cast(split_part(NEW.finish_day, '-', 2) as int))
		then
			return NEW;
		end if;
		if ((select cast(split_part(NEW.finish_day, '-', 1) as int))  < (select cast(split_part(NEW.start_day, '-', 1) as int))) and
			(select cast(split_part(NEW.start_day, '-', 2) as int)) < (select cast(split_part(NEW.finish_day, '-', 2) as int))
		then 
			return NEW;		
		else
			RAISE EXCEPTION 'The the start day must be before then the finish day';
		end if;
	end;
	$checkDate$ language plpgsql;

create trigger checkDate before insert on construction_stage
	for each row EXECUTE PROCEDURE checkDate();