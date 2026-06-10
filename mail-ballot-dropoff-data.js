// Mail-ballot dropoff-only markers (envelope icon) and supplemental schedules.
// Entries with isNew: true and lat/lng get their own map pin; others supplement
// a matching voting location popup by name.
const mailBallotDropoffLocations = [
    // Dropoff-only pin (shown with envelope icon):
    // {
    //     "name": "Historic Courthouse",
    //     "isNew": true,
    //     "address": "1616 8th St, Minden, NV 89423",
    //     "schedule": [
    //         { "date": "Tuesday (May 26)", "hours": "9:00 a.m. to 6:00 p.m." }
    //     ],
    //     "lat": 38.954664665279,
    //     "lng": -119.768082689561
    // },
    //
    // Supplemental schedule at an existing voting location (no separate pin):
    // {
    //     "name": "Community Center",
    //     "isNew": false,
    //     "address": "",
    //     "schedule": [
    //         { "date": "Friday (May 29)", "hours": "10:00 a.m. to 1:00 p.m." }
    //     ]
    // }
];
