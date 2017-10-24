
app.provider('subpageDetails', function(){
	var subpages = {}; 
	//subpages["/articles"] = { spreadsheetId: "1KcE5rNKGrTX4EVmdb-4KmZnpmJ8h92YQ8_mgpVt_FAE"}

	//subpages["/home"], subpages["/"] = {}; 
	subpages["/home"] = {}; 
	subpages["/dharmayatra"] = {
		title: "Dharmayatra Flyers (A3)",
		spreadsheetId: "1k24IRyWNX_OJtXCLVLvWzh36YtQcag20dE9v_9V6LCg", 
		width: 11, 
		height: 16,
		scale: 10
	};	
	subpages["/invitations"] = {
		title: "Invitations",
		spreadsheetId: "15bLgpQIlL-o1HaO34WOer5rHO2I7MzA_0-h8mi4togo",
		width: 6, 
		height: 4, 
		scale: 4
	};

	subpages["/banners"] = {};
	subpages["/banners6x10"] = {
		title: "Banners 6x10",
		spreadsheetId: "1mJoJ0Rb8FtZeEhHpt6wByFFMTFLd5KF8Nl1nEWnksZM",
		width: 10, 
		height: 6,
		scale: 20
	};
	subpages["/banners4x6"] = {
		title: "Banners 4x6",
		spreadsheetId: "1mJoJ0Rb8FtZeEhHpt6wByFFMTFLd5KF8Nl1nEWnksZM",
		width: 6, 
		height: 4,
		scale: 20
	}

//SRD -----------------------------------------

	subpages["/srdflyers"] = {
		title: "SRD Flyers", 
		spreadsheetId: "1OR8SnYpxaAuhT1j7Cgm_hqYIxw6ry6nr5c6rtJWklNQ",
		width: 11, 
		height: 16,
	}

	subpages["/srdstandees"] = {
		title: "SRD Standees",
		spreadsheetId: "1RyIVJyR-KR4g3PFdld-oy13K-GcXCtufFye5RM0Su9I",
		width: 3, 
		height: 6,
	}


//SRLC -----------------------------------------
	subpages["/srlcposters"] = {
		title: "SRLC Posters",
		spreadsheetId: "1M3QrPI2qALUzRwHMGznIxr1ZhnCpA8p8kBpfIRrVAa0",
		width: 11, 
		height: 16,
	}

	subpages["/srlcbanners"] = {
		title: "SRLC Banners",
		spreadsheetId: "1kUQJxsgSHdNY3z0-iU8JrMwA544RnbPM3R67bo4JMuc",
		width: 3, 
		height: 6,
	}

	subpages["/srlcstandees"] = {
		title: "SRLC Standee",
		spreadsheetId: "1PiKOAkctDOLLXIueqfUt4dOYpilpEtuTerMDZXxj6zw",
		width: 3, 
		height: 6,
	}

	this.subpages = subpages; 
	this.$get = function() {
        return subpages; 
    };

    this.setName = function(name) {
        subpages[name] = {}; 
    };
}); 