# inSeasonLocally

## Resources
[Asana Board](https://app.asana.com/0/1204327238436147/board)

[Pull Request Template](https://docs.google.com/document/d/1SmlknRfSks5A4XnwhSCLb7iy5ehZPYxoKkjn27yMBOA/edit?usp=sharing)

[Figma Link](https://www.figma.com/file/j1SDqpdQiOmRuNTQsM4sf2/inseasonlocally?node-id=0-1&t=XZ2O48iIpwkRhlZL-0)

## Information about the tables in the database


 Tables have been created in ElephantSQL
  
 ***Accounts***
 *   Column      *     Data Type
 *   email       *     varchar(255)  (Primary Key)
 *   password    *     varchar(255)  (Cannot be null)
 *   state       *     varchar(20)   (Cannot be null)
  
 ***Reviews***
 *   Column      *     Data Type
 *   review_id   *     serial        (Primary Key)
 *   email       *     varchar(255)  (Foreign Key)
 *   produce     *     varchar(50)   (Foreign Key)
 *   farm        *     varchar(50)   (Cannot be null)
 *   description *     text          (Cannot be null)
  
***Produce***
 *   Column      *     Data Type
 *   name        *     varchar(50)   (Primary Key)
 *   img         *     varchar(255)  
  
***Seasons***
*    Column      *     Data Type
*    season      *     varchar(10)   (Primary Key)
*    start_date  *     varchar(50)   (Cannot be null)
*    end_date    *     varchar(50)   (Cannot be null)
  
***SeasonProduce***
*    Column      *     Data Type
*    season      *     varchar(10)   (Foreign Key)
*    produce     *     varchar(50)   (Foreign Key)
*    state       *     varchar(30)   (Cannot be null)

***Sessions***
*    Column      *     Data Type
*    _id         *     serial        (Primary Key)
*    cookie_id   *     varchar(255)  (Cannot be null)
*    created_at  *     date          (default value is the current date)
 
