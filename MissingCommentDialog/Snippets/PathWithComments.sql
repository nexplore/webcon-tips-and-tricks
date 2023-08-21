select ISNULL('['+
   STUFF(
    (
      /* Creating the json structure and retrieving the color from the xml string*/
      select 
            CHAR(123)
            + '"id":'+ cast(Path_ID as varchar(10))
            +',"name":"'+replace(PATH_Name,'"','''') +'"'
            +CHAR(125)
            +','
      from 
            (
                  /* Returning the path information */
                  select Path_ID, PATH_Name
                  from WFAvaiblePaths 
				  where PATH_STPID = {STP_ID}
				  AND PATH_CommentRequired = 1
            ) temp
     FOR XML PATH('')
  )
  ,1,0,'')
  +']', '[]')