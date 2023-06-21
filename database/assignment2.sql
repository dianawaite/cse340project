INSERT INTO account
  ( account_firstname, account_lastname, account_email, account_password )
VALUES
  ( 'Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n' )


UPDATE
  account
SET 
  account_type = 'Admin'
WHERE
	account_id = 1


DELETE
FROM
  account
WHERE
  account_id = 1


UPDATE
	inventory
SET
	inv_description = REPLACE(inv_description, 'small interiors', 'the huge interior')
WHERE
	inv_id = 10


-- this one doesn't work quite right, getting lots more than 2 records back
SELECT
	inv_make,
	inv_model,
	classification_name
FROM
	inventory
INNER JOIN classification
	ON classification_name = 'Sports'


-- I think this one works, will try it again after I delete my database
UPDATE 
   inventory
SET 
   inv_image = REPLACE (
  	'/images/',
	'/images/',
	'/images/vehicles/'
   ),
   inv_thumbnail = REPLACE (
   '/images/',
	'/images/',
	'/images/vehicles/'
   );