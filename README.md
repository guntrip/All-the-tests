<<<<<<< HEAD
![alttext](https://github.com/uwiger/rvi_core/raw/uw-docs_0_5_0/doc/pdf/BUILD.pdf)

[comment]: # (This actually is the most platform independent comment)

<!---
your comment goes here
and here
-->

# Anderson-Darling-Normal-Test
Javascript Library to check if a set of data passes the Anderson Darling Normal Test:

[Testing for Normality](https://en.wikipedia.org/wiki/Anderson%E2%80%93Darling_test)

Example: 

Suppose we have an object containing Sales data for the year. 
Before running any sort of statistical model against the data, we want to check if the dataset follows a normal distribution:

```
var sales = [
                { month: 6, year: 2014, qty: 89.901 },
                { month: 7, year: 2014, qty: 16.167 },
                { month: 8, year: 2014, qty: 4.491 },
                { month: 9, year: 2014, qty: 0 },
                { month: 10, year: 2014, qty: 71.919 },
                { month: 11, year: 2014, qty: 2.697 },
                { month: 12, year: 2014, qty: 47.25 },
                { month: 1, year: 2015, qty: 50.25 },
                { month: 2, year: 2015, qty: 66.96 },
                { month: 3, year: 2015, qty: 85.0 },
                { month: 4, year: 2015, qty: 85.33 }];

 // the check takes in an array of numerical values so we first map to an array: 

 var salesArr = sales.map(function (d) { return d.qty; });
  
 // call the library function
 var normalDist = adNormalityTest.check(salesArr);

 //output: 
 {"data":[0,2.697,4.491,16.167,47.25,50.25,66.96,71.919,85,85.33,89.901],
	"mean":47.269545454545444,
	"stdP":33.99507108488105,
	"stdS":35.65433134799652,
	"pValue":0.125253075405902,
	"normal":true} 
```

Normal attribute is true if normal and false if not-normal. (Based on P-Value being > 0.05)
=======
# zipline-portfolio
>>>>>>> 9af76f9812b39ebda63d55bb3929bb77894c4995
