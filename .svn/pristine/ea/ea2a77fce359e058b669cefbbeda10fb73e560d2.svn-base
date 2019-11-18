ALTER TABLE T_FLOW_INSTANCE ADD T_FLOW_INSTANCE BIGINT DEFAULT 0
alter table T_FLOW_INSTANCE add DAYS bigint

//////////////////////////////
ALTER FUNCTION [dbo].[F_GETNOSGMAN](@yearmth varchar(6),@bgDATE varchar(10),@edDate varchar(10)) 
returns int
AS 
	BEGIN 
	declare @userId int,@times int;
	declare @workdays int,@rtnValue int;
	set @workdays = dbo.F_GETWORKDAYS(@yearmth)*2;
	set @rtnValue = 0;
	declare curr1 cursor
	for select a.USERID from dbo.APP_USER a where a.DELFLAG=0 and USERNAME not in('system','admin') 
	open curr1;
	fetch curr1 into @userId;
	while (@@fetch_status=0)
	begin
		set @times = (select ISNULL(SUM(ISNULL(t.sg_sum,0)),0) from dbo.T_ATTENDAMCE t where t.SG_DATE>=@bgDATE and t.SG_DATE<=@edDate and t.USERID=@userId);
		if @workdays>@times or @times is null
		begin
			set @rtnValue = @rtnValue +1;
		end
		fetch next from curr1 into @userId;
	end
	close curr1;
	deallocate curr1;
	
return @rtnValue
END

----add by zhangyz 20160226 
create table T_COMPONT_STOCKS(
SID BIGINT IDENTITY(1,1) NOT NULL,
COMPON_ID bigint NOT NULL,
COMPON_SERIAL varchar(64) NOT NULL,
YEARMTH varchar(10) not null,
QUANTITY int,
SUM_FEE numeric(12, 2) NOT NULL
PRIMARY KEY CLUSTERED 
(
	[SID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

