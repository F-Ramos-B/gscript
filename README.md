# Gscript

Version: 0.1.1

Small JavaScript framework for ChoiceScript giving some new functionality which could be useful for Choicescript game programmers.

Features:

  - Change page style
  - Array support
  - Object instances support
  - Utility functions

Below is the documentation; one might need some JavaScript knowledge to use some of the most advanced features, but easier ones should be simpler to use.

# Installation

Simply extract the contents of the file to your `dfabulich-choicescript-8456ed7\web\mygame` folder and overwrite index.html when asked.

At the start of your game, after you declare your variables, add this line so the framework can start:

```
*script startup()
```

I've added a sample startup.txt file as an example that uses some of the functions this framework provides.

# Disclaimer

This project is has no involvement or support from Choice of Games LLC and is entirely personal. I may at any time decide to stop supporting this project and will not be held accountable if it screws up something on your game or if a ChoiceScript update breaks something.

I do not know if Choice of Games LLC will accept games published using this or any sort of games using JavaScript at all so use this on your game at your own peril.

This project uses Lodash (https://lodash.com/) for internal operations and it comes bundled with the installation.

# Documentation

## Introduction

As a TypeScript programmer I decided to make this little side project as a fun past time and I'm now sharing if others are interested in trying it out. It might be confusing at first but I tried to make the documentation easy to follow.

#### IMPORTANT

Don't use camelcase (variableName) for variables you create here, CS seems to transform them all to lower case so you might face issues if you make any variables like that. All supplied variables returned by the framework are lowercased. Since I have to parse stuff here and then I'm not yet sure if underscores will have any sort of conflict yet, give it a try and see if it works.

To pass variables from ChoiceScript to JavaScript functions here you can also use the following notations:

`vars.created.VARNAME` = For a created variable
`vars.temps.VARNAME` = For a temp variable

For some functions like the min and max evaluators this is how you need to pass values of variables of your ChoiceScript variables to the JS functions.

## Array module

In CS arrays aren't actually arrays, rather they are object keys that end with an underline and a number (like 'trucks_1', 'trucks_2' etc) which means they don't support normal array usage as in JS. To get around this GScript will wrap CS-pseudo arrays into actual JS arrays to do operations and then unwrap them to CS-pseudo arrays so they can be used on CS.

To keep consistency with CS arrays, unwrapped arrays will be supplied with indexes starting at 1.

On CS, array creation must be entirely manual as well, but through GScript it's possible to change that somewhat.


### Generate 'created' array

Generates an array as if you did it in *create; after creation the size of the array is supplied as 'return_ARRAYNAME_size'.

First parameter is the name, the rest are the values and can be infinite.

	*script createArrayDynamic('generated_array', 50, 30, 20, 40, 60, 70, 10, 20, 50, 20, 40, 25, 90, 25, 25, 30, 40)

	Generated array index 10: ${generated_array[10]}
	Size: ${return_generated_array_size}

### Generate temp array

Same as above but creates a *temp array instead of a *create.

	*script tempArrayDynamic('generated_array_temp', 'lasagne', 'pizza', 'pasta', 'onion', 'tomato')
	
	TEMP Generated array index 3: ${generated_array_temp[3]}
	Size: ${return_generated_array_size}

### Retrieve 'created' array size

Retrieves the size of a created array and supplies a variable called 'return_ARRAYNAME_size'.

	*script retrieveCreatedArrayLength('generated_array')

	Size: ${return_generated_array_size}

### Retrieve temp array size

Same as the above, but it's a *temp array.

	*script retrieveTempArrayLength('generated_array_temp')

	Size: ${return_generated_array_temp_size}

### Sort array

Sorts values into an array and then supplies it as 'return_sorted_array' and its size as 'return_sorted_array_size'.

	*script sortArray(50, 30, 20, 40, 60, 70, 10, 20, 50, 20, 40, 25, 90, 25, 25, 30, 40)

	Sorted array index 10: ${return_sorted_array[10]}
	Size: ${return_sorted_array_size}

### Using created or temp arrays as parameters

Functions like sort and the min max evaluators accept something called 'varargs', which are multiple parameters. But if you have an array in CS you want to use for those functions you can use the spread operator, which are three dots '...' before the array.

For this reason I added a function called wrapArray.

#### Wrap Array ('created' and temp)

In CS all indexes of the array are stored in different variables with no link to each other. So to use these as actual arrays for the operations of sort and min and max we can use this function with the three dots for the spread operator before it.

	*script sortArray(...wrapCreatedArray('generated_array'))

	Sorted array index 10: ${return_sorted_array[10]}
	Size: ${return_sorted_array_size}

The wrapCreatedArray receives the name of the array in CS and then it will wrap it into an actual JS array, and then use the spread operator (...) to convert this into a varargs so that sortArray and min and max evaluators can accept it.

A wrapTempArray is also available if your array is of the *temp type, it takes the name of the array as a parameter as well.

Other functions like printer and printerTable can also accept this syntax.

	*script printer(...wrapCreatedArray('generated_array'))
	*script printerTable(...wrapTempArray('generated_array_temp'))

## Styles module

By using JS it's possible to modify the CSS of the current page, changing its look. I've left two styles available, 'terminal' and 'story' which were available on ChoiceScript Wiki.

### Create new style

Creates a new style that can be later applied. The value should be as a JS object with the CSS attributes you want to use.

	*script createNewStyle('terminal', { fontFamily:  'Helvetica', backgroundColor: '#061021', color: 'rgba(72, 125, 217, 1)'})

### Update created style

Updates a property from one of the created styles.

	*script updateCreatedStyle('terminal', { textAlign: 'justify' })

This will apply justified text to the terminal style.

### Apply saved style

This will apply the style you saved to the page. Styles remain saved after use so you can change styles whenever you need.

	*script applySavedStyle('terminal');

### Apply new style

Applies a CSS property to the page as it is; saved styles are not modified.

	*script applyNewStyle({ textAlign: 'justify' }, { textJustify:  'inter-word' })

Applies justified text and inter-word justify type for the page.

### Reset page to default

Restores the default ChoiceScript look.

	*script resetStyle()

## Objects module

Sadly it's not possible to access object properties in CS. I tried to use something like ${person.age} and ${person[age]} but it didn't work. Because of that I store objects on HashMaps that hold an instance of an object by an id number. Once an instance is retrieved all of its properties will be supplied as in 'return_TYPENAME_instance_PROPERTYNAME'; arrays will also be unwrapped but arrays with objects inside are not yet supported.

To begin one must first create a new type of object.

### Create a new type

To create a new type, simply pass the type name as a parameter. If that type already exists, an error will be thrown.

	*script addNewType('vehicles')

### Insert new instance

Once a type is created, you can add a new instance to it. Once an instance is added, an id is set for it and supplied as 'return_newest_instance_id' variable. Use this id later to retrieve the object.

The first parameter is the name of the type you're adding to and the second is the value. Add this value as a JavaScript object type.

	*script insertInstance('vehicles', { name: 'sedan', engine: 'whatever  model', year: 2006, color: 'red', tires: [] })
	
	Sedan instance id: ${return_newest_instance_id}

	*script insertInstance('vehicles', { name: 'truck', engine: 'whatefeasver  model', year: 2010, color: 'yellow', tires: [] })

	Truck instance id: ${return_newest_instance_id}

	*script insertInstance('vehicles', { name: 'ford  Cruiser', engine: 'whatevweafdser  model', year: 2007, color: 'blue', tires: ['forward-left', 'forward-right', 'back-left', 'back-right'] })

	Ford Cruiser instance id: ${return_newest_instance_id}

	*script insertInstance('vehicles', { name: 'porsche', engine: 'whaeawfeadstever  model', year: 2002, color: 'black', tires: [] })
	
	Porsche instance id: ${return_newest_instance_id}

Above we are creating 4 car instances. The ids will start from 1 and go up as each instance is created.

### Retrieve instance

To retrieve an instance we use the supplyInstance function, passing the name type and the id as parameters. Once the function is used, temp variables will be supplied as 'return_TYPENAME_instance_PROPERTYNAME' for each property of that object.

	*script supplyInstance('vehicles', 3)

	Car name: $!{return_vehicles_instance_name}
	ID: ${return_vehicles_instance_id}
	Year: ${return_vehicles_instance_year}
	Engine type: $!!{return_vehicles_instance_engine}
	Color: $!{return_vehicles_instance_color}

### Update property from instance

To update a property from an instance, pass the type name, the id, the name of the property and the new value.

	*script updateProperty('vehicles', 3, 'color', 'gray')

This will update the color of the Ford Cruiser to gray.

### Update entire instance

To update the entire value of an instance you can pass the type name, the id and the new value. The whole value of the instance will be replaced with the one you provide.

	*script updateProperty('vehicles', 3, { name: 'ferrari', engine: 'badass  model', year: 2015, color: 'red of course', tires: [] })

The instance of id 3 which was the Ford Cruiser will now be a Ferrari.

### Delete instance

To delete an instance one can provide the type name and id. The next id generated from inserting a new instance will not use the one left open from the deleted instance, it will always be incremental.

	*script deleteInstance('vehicles', 3)


### Number of instances in type

Supplies the number of instances from the type as 'return_TYPENAME_size'. Deleted instances are not counted.

	*script sizeOfType('vehicles')


### Number of created instances

Same as above, but deleted instances are counted. Essentialy this retrieves the number of the last created id.

Supplied as 'return_TYPENAME_created_instances_size'

	*script sequenceOfType('vehicles')

## Functions module

In the function modules I've provided a few utility functions.

### Predicate

CS limits conditional expressions to only one 'and' or 'or' usage. With the predicate function it's possible to use JS's conditional expression evaluation so you can make a long comparison without needing multiple parenthesis. The words 'and' and 'or' will be automatically converted to the respective && and || of JavaScript before evaluation. Negation (!) can also be used.

The entire condition must be a string (wrapped in quotes) and variables must be referenced with 'vars.created.NAME' for global variables and 'vars.temps.NAME' for temp variables.

    *create  leadership  50
    *create  agility  40
    *create  speed  60
    *create  strength  30
    
    *script predicate('vars.created.agility < vars.created.speed and vars.created.leadership < vars.created.speed and vars.created.strength < vars.created.speed');
    
    Predicate: ${return_predicate_result}

If no error during the evaluation occurs, a temporary variable called 'return_predicate_result' will be supplied to ChoiceScript.

### Pure Predicate

Same as the above, but 'and' and 'or's will not be converted. Only && and || symbols from JavaScript will be used.

    *create  leadership  50
    *create  agility  40
    *create  speed  60
    *create  strength  30
    
    *script purePredicate('vars.created.agility < vars.created.speed && vars.created.leadership < vars.created.speed' && vars.created.strength < vars.created.speed);
    
    Pure Predicate: ${return_pure_predicate_result}

In this case the supplied variable will be called 'return_pure_predicate_result'.

## Number evaluators

On CS one has to use several ifs to verify what is the highest and/or lowest variable of a group. These functions can do exactly that no matter how many numbers are passed as parameters.

For all Min and Max evaluators, variables must be referenced with 'vars.created.NAME' for global variables and 'vars.temps.NAME' for temp variables.

### Min evaluator

Supplies a variable with the smallest number of a group.

	*create  leadership  50
	*create  agility  40
	*create  speed  60
	*create  strength  30
	*temp  weight  55
	
	*script supplyMinOf(vars.created.leadership, vars.created.strength, vars.created.speed, vars.created.agility, vars.temps.weight)
	
	Lowest is: ${return_min_of}

### Max evaluator

Same as the above, but checks for the highest value.

	*create  leadership  50
	*create  agility  40
	*create  speed  60
	*create  strength  30
	*temp  weight  55
	
	*script supplyMaxOf(vars.created.leadership, vars.created.strength, vars.created.speed, vars.created.agility, vars.temps.weight)
	
	Highest is: ${return_max_of}


### Min Evaluator with variable

Same as the two above but supplies two variables. One with the name of the variable and another with the highest value.

The parameters must be in object format ( { variable_name: variable_value } ).

	*create  leadership  50
	*create  agility  40
	*create  speed  60
	*create  strength  30
	*temp  weight  55
	
	*script supplyMinOfWithVar({ leadership: vars.created.leadership}, { strength: vars.created.strength }, { speed: vars.created.speed }, { agility: vars.created.agility }, { weight: vars.temps.weight });
	
	Lowest value is: ${return_min_of}
	Name of the variable with lowest value: ${return_min_of_varname}


### Max Evaluator with variable

Same as the above but supplies two variables of highest value and name of variable with highest value.

	*create  leadership  50
	*create  agility  40
	*create  speed  60
	*create  strength  30
	*temp  weight  55
	
	*script supplyMaxOfWithVar({ leadership: vars.created.leadership}, { strength: vars.created.strength }, { speed: vars.created.speed }, { agility: vars.created.agility }, { weight: vars.temps.weight });
	
	Highest value is: ${return_max_of}
	Name of the variable with highest value: ${return_max_of_varname}
	

### Console printer

Prints parameters on the browser console by using JavaScript console.log function.

	*script printer('Hello world')
	*script printer('One', 'Two', 'Three')
	*script printer({name: 'Erik', age: 20})

### Console table printer

Prints parameter on the browser console as a table by using JavaScript console.table function, useful for objects and arrays.

	*script printerTable([10, 20, 30, 40, 50, 60, 70])

## Injector module

With the injector module it's possible to create new global (variables made with *create command) as well as new temp variables.

### InjectCreatedVar

Injects a new created (global) variable. Receives a name for the variable and its value as parameters.

	*script injectCreatedVar('bed_color', 'green')
	
	You enter the room and look at the bed, its color is ${bed_color}.

### DeleteTemps

Clears specific temps from memory. Trying to use them afterwards will cause an error. Variables with the same names can still be created again.

	*script deleteTemps('bed_color', 'chair_color', 'rug_color')

### ClearTemps

Same as above, but all temps are cleared.

	*script clearTemps()


## Text module

CS allows capitalization and uppercase transformation of text variables, but does not allow lower capitalization.

### Text replacer

I've added new text selectors to transform variables; some are the same that exist on CS while others give new functionalities.

`$GS{VARIABLE_NAME}` = Replaces with the value of the variable, no transformation.
`$!GS{VARIABLE_NAME}` = First letter is capitalized.
`$!!GS{VARIABLE_NAME}` = Entire value is capitalized.
`$GS!{VARIABLE_NAME}` = First letter is lowercased.
`$GS!!{VARIABLE_NAME}` = Entire value is lowercased.
`$!GS!{VARIABLE_NAME}` = First letter is capitalized, rest is lowercased.


	$GS{return_vehicles_instance_name}
	$!GS{return_vehicles_instance_name}
	$!!GS{return_vehicles_instance_name}
	$GS!{return_vehicles_instance_name}
	$GS!!{return_vehicles_instance_name}
	$!GS!{return_vehicles_instance_name}
	
	$GS{return_vehicles_instance_color}
	$!GS{return_vehicles_instance_color}
	$!!GS{return_vehicles_instance_color}
	$GS!{return_vehicles_instance_color}
	$GS!!{return_vehicles_instance_color}
	$!GS!{return_vehicles_instance_color}

	*script pageTextReplacer({return_vehicles_instance_name: vars.temps.return_vehicles_instance_name}, {return_vehicles_instance_color: vars.temps.return_vehicles_instance_color})

The whole visible text on the page will be transformed depending on the identifiers used.

Result:

	ford Cruiser
	Ford Cruiser
	FORD CRUISER
	ford Cruiser
	ford cruiser
	Ford cruiser
	light blue
	Light blue
	LIGHT BLUE
	light blue
	light blue
	Light blue
