# Task List API

Simple REST API that allows the user to edit his task list.

Built on node.js and connected to MySQL database. The database provider is freesqldatabase.com.

## API urls

### POST:

**/gettasks**

Returns a list of task with given sorting and filtering options.

Parameters:
* sortType - 'difficulty ASC' | 'difficulty DESC' | 'deadline ASC' | 'deadline DESC' - how the tasks should be sorted
* filterDifficultyType - '' | '1' | '2' | '3' - what tasks should be returned based on their difficulty ('' - all, 1' - easy, '2' - medium, '3' - hard)
* filterDeadlineType - '' | '1' | '2' | '3' | '4' - what tasks should be returned based on their deadline ('' - all, '1' - today, '2' - this week, '3' - this month, '4' - long term goas)

**/addtask**

Adds a task with given parameters.

Parameters:
* description - task description (string)
* difficulty - '1' | '2' | '3' - what is a task difficulty ('1' - easy, '2' - medium, '3' - hard)
* deadline - '1' | '2' | '3' | '4' - what is a task deadline ('1' - today, '2' - this week, '3' - this month, '4' - long term goal)

**/updatetask**

Updates a task with given id.

Parameters:
* id - task id (number)
* newDescription - new task description (string)
* newDifficulty - '1' | '2' | '3' - new task difficulty ('1' - easy, '2' - medium, '3' - hard)
* newDeadline - '1' | '2' | '3' | '4' - new task deadline ('1' - today, '2' - this week, '3' - this month, '4' - long term goal)

### GET:

**/completetask/:id**

Marks a task with given id as completed.

**/undotask/:id**

Marks a task with given id as not completed.

**/deletetask/:id**

Removes a task with given id.

## Example application:

An example application that uses that API can be found under the following url: http://mwisniewski.5gbfree.com/task-list/