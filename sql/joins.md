# Joins in SQL

## Joins 
allow us to combine data from multiple tables

## Types of Joins
- Inner Join
- Outer Join
    - Left Outer Join
    - Right Outer Join
    - Full Outer Join

## Inner Join
Returns only the rows that match in both tables

for example, if we have two tables,
`students` and `grades`, and we want to get 
the name of the student and their grade, 
we can use an inner join to get the data we want

let the `students` table have the following data
| id | name |
| -- | ---- |
| 1  | John |
| 2  | Jane |
| 3  | Jack |

and the `grades` table have the following data
| id | grade |
| -- | ----- |
| 1  | 90    |
| 2  | 80    |
| 3  | 70    |

we can use the following query to get the name and grade of each student
```sql
SELECT students.name, grades.grade
FROM students
INNER JOIN grades
ON students.id = grades.id;
```

the result of the query will be
| name | grade |
| ---- | ----- |
| John | 90    |
| Jane | 80    |
| Jack | 70    |

## Outer Join
Returns all rows from both tables, even if there is no match.
There are three types of outer joins:
- Left Outer Join
- Right Outer Join
- Full Outer Join

### Left Outer Join
Returns all rows from the left table, and the matched rows from the right table

for example, if we have two tables,
`students` and `grades`, and we want to get
the name of the student and their grade,
we can use a left outer join to get the data we want

let the `students` table have the following data
| id | name |
| -- | ---- |
| 1  | John |
| 2  | Jane |
| 3  | Jack |

and the `grades` table have the following data
| id | grade |
| -- | ----- |
| 1  | 90    |
| 2  | 80    |

we can use the following query to get the name and grade of each student
```sql
SELECT students.name, grades.grade
FROM students
LEFT JOIN grades
ON students.id = grades.id;
```

the result of the query will be
| name | grade |
| ---- | ----- |
| John | 90    |
| Jane | 80    |
| Jack | NULL  |

here we can see that the student with id 3, Jack, has a NULL grade,
because there is no matching row in the `grades` table

### Right Outer Join
Returns all rows from the right table, and the matched rows from the left table

for example, if we have two tables,
`customers` and `orders`, and we want to get
all the orders and the customer who made them,
but sometimes there are orders that don't have a customer,
we can use a right outer join to get the data we want

let the `customers` table have the following data
| id | name |
| -- | ---- |
| 1  | John |
| 2  | Jane |
| 3  | Jack |

and the `orders` table have the following data
| id | customer_id | amount |
| -- | ----------- | ------ |
| 101 | 1    | 100 |
| 102 | 2    | 200 |
| 103 | NULL | 300 |
| 104 | NULL | 400 |

we can use the following query to get all the orders and the customer who made them
```sql
SELECT orders.id, customers.name, orders.amount
FROM orders
RIGHT JOIN customers
ON orders.customer_id = customers.id;
```

the result of the query will be
| id | name | amount |
| -- | ---- | ------ |
| 101 | John | 100 |
| 102 | Jane | 200 |
| 103 | NULL | 300 |
| 104 | NULL | 400 |


### Full Outer Join
Returns all rows from both tables, even if there is no match

for example, if we have two tables,
`customers` and `orders`, and we want to get
all the orders and the customer who made them,
but sometimes there are orders that don't have a customer,
and sometimes there are customers that don't have any orders,
we can use a full outer join to get the data we want

let the `customers` table have the following data
| id | name |
| -- | ---- |
| 1  | John |
| 2  | Jane |
| 3  | Jack |

and the `orders` table have the following data
| id | customer_id | amount |
| -- | ----------- | ------ |
| 101 | 1    | 100 |
| 102 | 2    | 200 |
| 103 | NULL | 300 |
| 104 | NULL | 400 |

we can use the following query to get all the orders and the customer who made them
```sql
SELECT orders.id, customers.name, orders.amount
FROM orders
FULL OUTER JOIN customers
ON orders.customer_id = customers.id;
```

the result of the query will be
| id | name | amount |
| -- | ---- | ------ |
| 101 | John | 100 |
| 102 | Jane | 200 |
| 103 | NULL | 300 |
| 104 | NULL | 400 |
| NULL | Jack | NULL |
