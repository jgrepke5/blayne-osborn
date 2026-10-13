// Mail-ballot dropoff-only markers (envelope icon) and supplemental schedules.
// Entries with isNew: true and lat/lng get their own map pin; others supplement
// a matching voting location popup by name.
const mailBallotDropoffLocations = [
    {
        "name": "Fish Springs Fire Station",
        "isNew": true,
        "address": "2249 Fish Springs Rd, Gardnerville, NV 89410",
        "schedule": [
            {
                "date": "Tuesday (October 20)",
                "hours": "3:00 p.m. to 6:00 p.m."
            },
            {
                "date": "Tuesday (October 27)",
                "hours": "10:00 a.m. to 1:00 p.m."
            }
        ],
        "lat": 38.936178453589,
        "lng": -119.656240918271
    },
    {
        "name": "Gardnerville Ranchos Fire Station",
        "isNew": true,
        "address": "940 Mitch Dr, Gardnerville, NV 89460",
        "schedule": [
            {
                "date": "Wednesday (October 21)",
                "hours": "3:00 p.m. to 6:00 p.m."
            },
            {
                "date": "Wednesday (October 28)",
                "hours": "3:00 p.m. to 6:00 p.m."
            }
        ],
        "lat": 38.907487616225,
        "lng": -119.73054065264
    },
    {
        "name": "Genoa Town Hall",
        "isNew": true,
        "address": "2287 Main St, Genoa, NV 89411",
        "schedule": [
            {
                "date": "Friday (October 23)",
                "hours": "10:00 a.m. to 1:00 p.m."
            },
            {
                "date": "Thursday (October 29)",
                "hours": "3:00 p.m. to 6:00 p.m."
            }
        ],
        "lat": 39.002826034935,
        "lng": -119.846118309641
    },
    {
        "name": "Johnson Lane Fire Station",
        "isNew": true,
        "address": "1450 Stephanie Way, Minden, NV 89423",
        "schedule": [
            {
                "date": "Monday (October 19)",
                "hours": "10:00 a.m. to 1:00 p.m."
            },
            {
                "date": "Thursday (October 22)",
                "hours": "3:00 p.m. to 6:00 p.m."
            },
            {
                "date": "Friday (October 30)",
                "hours": "3:00 p.m. to 6:00 p.m."
            }
        ],
        "lat": 39.041283200555,
        "lng": -119.732057272404
    },
    {
        "name": "Dayton Utilities",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Saturday (October 17)",
                "hours": "10:00 a.m. to 3:00 p.m."
            },
            {
                "date": "Monday (October 19)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Tuesday (October 20)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Wednesday (October 21)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Thursday (October 22)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Friday (October 23)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Saturday (October 24)",
                "hours": "10:00 a.m. to 3:00 p.m."
            },
            {
                "date": "Monday (October 26)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Tuesday (October 27)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Wednesday (October 28)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Thursday (October 29)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Friday (October 30)",
                "hours": "9:00 a.m. to 5:00 p.m."
            }
        ]
    },
    {
        "name": "Douglas County Community Center",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Saturday (October 17)",
                "hours": "10:00 a.m. to 2:00 p.m."
            },
            {
                "date": "Tuesday (October 20)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Wednesday (October 21)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Thursday (October 22)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Friday (October 23)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Saturday (October 24)",
                "hours": "10:00 a.m. to 2:00 p.m."
            },
            {
                "date": "Monday (October 26)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Tuesday (October 27)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Wednesday (October 28)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Thursday (October 29)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Friday (October 30)",
                "hours": "9:00 a.m. to 6:00 p.m."
            }
        ]
    },
    {
        "name": "Fernley City Hall",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Saturday (October 17)",
                "hours": "10:00 a.m. to 3:00 p.m."
            },
            {
                "date": "Monday (October 19)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Tuesday (October 20)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Wednesday (October 21)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Thursday (October 22)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Friday (October 23)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Saturday (October 24)",
                "hours": "10:00 a.m. to 3:00 p.m."
            },
            {
                "date": "Monday (October 26)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Tuesday (October 27)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Wednesday (October 28)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Thursday (October 29)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Friday (October 30)",
                "hours": "9:00 a.m. to 5:00 p.m."
            }
        ]
    },
    {
        "name": "Historic Courthouse",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Saturday (October 17)",
                "hours": "10:00 a.m. to 2:00 p.m."
            },
            {
                "date": "Monday (October 19)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Tuesday (October 20)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Wednesday (October 21)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Thursday (October 22)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Friday (October 23)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Saturday (October 24)",
                "hours": "10:00 a.m. to 2:00 p.m."
            },
            {
                "date": "Monday (October 26)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Tuesday (October 27)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Wednesday (October 28)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Thursday (October 29)",
                "hours": "9:00 a.m. to 6:00 p.m."
            },
            {
                "date": "Friday (October 30)",
                "hours": "9:00 a.m. to 6:00 p.m."
            }
        ]
    },
    {
        "name": "Indian Hills GID Offices",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Wednesday (October 21)",
                "hours": "10:00 a.m. to 1:00 p.m."
            },
            {
                "date": "Monday (October 26)",
                "hours": "3:00 p.m. to 6:00 p.m."
            },
            {
                "date": "Friday (October 30)",
                "hours": "10:00 a.m. to 1:00 p.m."
            }
        ]
    },
    {
        "name": "Kahle Community Center",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Monday (October 19)",
                "hours": "3:00 p.m. to 6:00 p.m."
            },
            {
                "date": "Thursday (October 22)",
                "hours": "10:00 a.m. to 1:00 p.m."
            },
            {
                "date": "Monday (October 26)",
                "hours": "10:00 a.m. to 1:00 p.m."
            },
            {
                "date": "Wednesday (October 28)",
                "hours": "10:00 a.m. to 1:00 p.m."
            }
        ]
    },
    {
        "name": "Lyon County Admin Complex",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Saturday (October 17)",
                "hours": "10:00 a.m. to 3:00 p.m."
            },
            {
                "date": "Monday (October 19)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Tuesday (October 20)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Wednesday (October 21)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Thursday (October 22)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Friday (October 23)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Saturday (October 24)",
                "hours": "10:00 a.m. to 3:00 p.m."
            },
            {
                "date": "Monday (October 26)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Tuesday (October 27)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Wednesday (October 28)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Thursday (October 29)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Friday (October 30)",
                "hours": "9:00 a.m. to 5:00 p.m."
            }
        ]
    },
    {
        "name": "Silver Springs Community Center",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Saturday (October 17)",
                "hours": "10:00 a.m. to 3:00 p.m."
            },
            {
                "date": "Monday (October 19)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Tuesday (October 20)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Wednesday (October 21)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Thursday (October 22)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Friday (October 23)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Saturday (October 24)",
                "hours": "10:00 a.m. to 3:00 p.m."
            },
            {
                "date": "Monday (October 26)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Tuesday (October 27)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Wednesday (October 28)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Thursday (October 29)",
                "hours": "9:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Friday (October 30)",
                "hours": "9:00 a.m. to 5:00 p.m."
            }
        ]
    },
    {
        "name": "TRE Community Center",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Tuesday (October 20)",
                "hours": "10:00 a.m. to 1:00 p.m."
            },
            {
                "date": "Tuesday (October 27)",
                "hours": "3:00 p.m. to 6:00 p.m."
            }
        ]
    },
    {
        "name": "Tribal Complex",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Monday (October 19)",
                "hours": "8:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Tuesday (October 20)",
                "hours": "8:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Wednesday (October 21)",
                "hours": "8:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Thursday (October 22)",
                "hours": "8:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Friday (October 23)",
                "hours": "8:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Monday (October 26)",
                "hours": "8:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Tuesday (October 27)",
                "hours": "8:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Wednesday (October 28)",
                "hours": "8:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Thursday (October 29)",
                "hours": "8:00 a.m. to 5:00 p.m."
            },
            {
                "date": "Friday (October 30)",
                "hours": "8:00 a.m. to 5:00 p.m."
            }
        ]
    },
    {
        "name": "Washoe Tribe Community Center",
        "isNew": false,
        "address": "",
        "schedule": [
            {
                "date": "Friday (October 23)",
                "hours": "3:00 p.m. to 6:00 p.m."
            },
            {
                "date": "Thursday (October 29)",
                "hours": "10:00 a.m. to 1:00 p.m."
            }
        ]
    }
];
