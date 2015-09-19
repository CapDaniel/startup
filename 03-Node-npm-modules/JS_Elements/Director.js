define(['Multimedia'], function(Multimedia)
{
	// Constructor
  	function Director(Name)
  	{
	    // Attributes
	    var Name = Name;
	    var Quotes = new Array();
	    this.addQuote = function(Quote)
	    {
	      	Quotes[Quotes.length] = Quote;
	    }
	    this.speak = function()
	    {
	      	console.log(Name + " says : ");
	      	for (var q in Quotes)
	      	{
	        	console.log(" - \"" + Quotes[q] + "\"");
	      	}
	    }
	}
	Director.prototype.constructor = Director;
	return
	{
		Director : Director
	};
});