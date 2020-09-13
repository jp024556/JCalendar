# JCalendar
A cross browser helpful method to integrate custom Calendar in your project.

## Usage

```JS
Step 1: Add JCalendar.js to your project.
  --> <script src="path/JCalendar.js"></script>

Step 2: Add JCalendar.css to your project
  --> <link href="path/JCalendar.css" rel="stylesheet">
 
Step 3: Call below method.
  @ className --> Give CSS class of the elements on which you want to show calendar. [REQUIRED]
  @ iconURL --> Give an URL for image which you want to use as an icon to the calendar. [REQUIRED]
  
startJC(className, iconURL);

```

## Example

```HTML
<!DOCTYPE html>
<html>
<head>
	<title>JCalendar</title>
	<link rel="stylesheet" type="text/css" href="path_to_jc/JCalendar.css">
</head>
<body>
	<form>
		<input type="text" class="birthday">
		<input type="submit">
	</form>
<!-- JavaScript  -->
<script src="path_to_jc/JCalendar.js"></script>
<script>
	// Call JCalendar
	startJC("birthday", "https://dummyimage.com/20x20/000/fff.png&text=JC");
</script>
</body>
</html>

```
