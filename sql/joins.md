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

here we can see that the order with id 103 has no customer,
and the customer with id 3 has no orders

## Examples

consider the following database schema


**Customers**:
- customer_id (INT, primary key)
- first_name (VARCHAR)
- last_name (VARCHAR)
- email (VARCHAR)
- city (VARCHAR)

**Orders**:
- order_id (INT, primary key)
- customer_id (INT, foreign key referencing Customers)
- order_date (DATE)
- total_amount (DECIMAL)


**Products**:
- product_id (INT, primary key)
- product_name (VARCHAR)
- price (DECIMAL)
- category (VARCHAR)


**Employees**:
- employee_id (INT, primary key)
- first_name (VARCHAR)
- last_name (VARCHAR)
- job_title (VARCHAR)

### Identify customers' highest-priced orders

```sql
SELECT c.first_name, c.last_name, MAX(o.total_amount) AS highest_order
FROM customers AS c
INNER JOIN orders AS o
ON c.customer_id = o.customer_id
GROUP BY c.customer_id;
```
the result of the query will be
| first_name | last_name | highest_order |
| ---------- | --------- | ------------- |
| ... | ... | ... |

#### Explanation
- `SELECT c.first_name, c.last_name, MAX(o.total_amount) AS highest_order`
    - we want to select the first name, last name, and highest order amount of each customer
- `FROM customers AS c`
    - we want to get data from the customers table, and we will refer to it as `c`
- `INNER JOIN orders AS o`
    - we want to join the orders table, and we will refer to it as `o`
- `ON c.customer_id = o.customer_id`
    - we want to join the tables on the customer_id column
- `GROUP BY c.customer_id`
    - we want to group the data by customer_id, so that we can get the highest order amount for each customer

### Identify customers who have not placed any orders
    
```sql
    SELECT c.first_name, c.last_name
    FROM customers AS c
    LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
    WHERE o.customer_id IS NULL;
```

the result of the query will be
| first_name | last_name |
| ---------- | --------- |
| ... | ... |

#### Explanation
- `SELECT c.first_name, c.last_name`
    - we want to select the first name and last name of each customer
- `FROM customers AS c`
    - we want to get data from the customers table, and we will refer to it as `c`
- `LEFT JOIN orders AS o`
    - we want to join the orders table, and we will refer to it as `o`
- `ON c.customer_id = o.customer_id`
    - we want to join the tables on the customer_id column
- `WHERE o.customer_id IS NULL`
    - we want to filter the data so that we only get customers who have no orders

here we used a left join, because we want to get all the customers,
even if they have no orders

#### Identify products without any orders:
    
```sql
    SELECT p.product_name, p.price
    FROM products AS p
    LEFT JOIN orders AS o
    ON p.product_id = o.product_id
    WHERE o.product_id IS NULL;
```

the result of the query will be
| product_name | price |
| ------------ | ----- |
| ... | ... |

#### Explanation
- `SELECT p.product_name, p.price`
    - we want to select the product name and price of each product
- `FROM products AS p`
    - we want to get data from the products table, and we will refer to it as `p`
- `LEFT JOIN orders AS o`
    - we want to join the orders table, and we will refer to it as `o`
- `ON p.product_id = o.product_id`
    - we want to join the tables on the product_id column
- `WHERE o.product_id IS NULL`
    - we want to filter the data so that we only get products that have no orders

### List customers along with the number of orders they've placed
    
```sql
    SELECT c.first_name, c.last_name, COUNT(o.order_id) AS num_orders
    FROM customers AS c
    LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
    GROUP BY c.customer_id;
```
the result of the query will be
| first_name | last_name | num_orders |
| ---------- | --------- | ---------- |
| ... | ... | ... |

#### Explanation
- `SELECT c.first_name, c.last_name, COUNT(o.order_id) AS num_orders`
    - we want to select the first name, last name, and number of orders of each customer
- `FROM customers AS c`
    - we want to get data from the customers table, and we will refer to it as `c`
- `LEFT JOIN orders AS o`
    - we want to join the orders table, and we will refer to it as `o`
- `ON c.customer_id = o.customer_id`
    - we want to join the tables on the customer_id column
- `GROUP BY c.customer_id`
    - we want to group the data by customer_id, so that we can get the number of orders for each customer

### Calculate total sales per employee
        
```sql
        SELECT e.first_name, e.last_name, SUM(o.total_amount) AS total_sales
        FROM employees AS e
        LEFT JOIN orders AS o
        ON e.employee_id = o.employee_id
        GROUP BY e.employee_id;
```

the result of the query will be
| first_name | last_name | total_sales |
| ---------- | --------- | ----------- |
| ... | ... | ... |

#### Explanation
- `SELECT e.first_name, e.last_name, SUM(o.total_amount) AS total_sales`
    - we want to select the first name, last name, and total sales of each employee
- `FROM employees AS e`
    - we want to get data from the employees table, and we will refer to it as `e`
- `LEFT JOIN orders AS o`
    - we want to join the orders table, and we will refer to it as `o`
- `ON e.employee_id = o.employee_id`
    - we want to join the tables on the employee_id column
- `GROUP BY e.employee_id`
    - we want to group the data by employee_id, so that we can get the total sales for each employee

### Find the most popular product category based on total sales
        
```sql
        SELECT p.category, SUM(o.total_amount) AS total_sales
        FROM products AS p
        LEFT JOIN orders AS o
        ON p.product_id = o.product_id
        GROUP BY p.category
        ORDER BY total_sales DESC
        LIMIT 1;
```

the result of the query will be
| category | total_sales |
| -------- | ----------- |
| ... | ... |

#### Explanation
- `SELECT p.category, SUM(o.total_amount) AS total_sales`
    - we want to select the category and total sales of each product
- `FROM products AS p`
    - we want to get data from the products table, and we will refer to it as `p`
- `LEFT JOIN orders AS o`
    - we want to join the orders table, and we will refer to it as `o`
- `ON p.product_id = o.product_id`
    - we want to join the tables on the product_id column
- `GROUP BY p.category`
    - we want to group the data by category, so that we can get the total sales for each category
- `ORDER BY total_sales DESC`
    - we want to order the data by total sales, in descending order
- `LIMIT 1`
    - we want to limit the data to 1 row, so that we only get the most popular category
