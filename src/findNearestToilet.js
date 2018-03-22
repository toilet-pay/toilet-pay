const superagent = require('superagent');
const LOCATIONS = require('../locations.js');


module.exports = async function findNearestToilet(lat, long) {

    const [
        nearestToiletFromDB,
        nearestToiletFromGoogle,
    ] =
        await
    Promise.all([
        findNearestToiletFromDB(lat, long),
        findNearestToiletFromGoogle(lat, long),
    ]);


    return nearestToiletFromGoogle;

};


function pointDistance(lat1, lon1, lat2, lon2) {

    //console.log(lat1,lon1,lat2,lon2);

    if (Number.prototype.toRadians === undefined) {
        Number.prototype.toRadians = function () {
            return this * Math.PI / 180;
        };
    }

    const φ1 = lat1.toRadians(), φ2 = lat2.toRadians(), Δλ = (lon2 - lon1).toRadians(), R = 6371e3; // gives d in metres
    const d = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R;
    return d;
}


async function findNearestToiletFromDB(lat, long) {

    const sortedLocations = LOCATIONS.sort((a, b) => pointDistance(a.coords[0], a.coords[1], lat, long) > pointDistance(b.coords[0], b.coords[1], lat, long) ? 1 : -1
)

    //console.log(sortedLocations);

    return sortedLocations[0];


}


async function findNearestToiletFromGoogle(lat, long) {

    const responseRaw = await
        superagent.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${ long}&rankby=distance&type=restaurant&query=toilet&keyword=&opennow&key=AIzaSyDeTjAOKV66YAuO1TOWIiX11etHey_cPJc`);


    const response = JSON.parse(responseRaw.text);

    const location = (response.results[0]);


    return {
        name: location.name,
        coords: [
            location.geometry.location.lat,
            location.geometry.location.lng,
        ]
    }

    //return sortedLocations[0];


}


/*
findNearestToiletFromGoogle(50.050445, 14.432343).then((toilet) => {
    console.log('=======================================');
console.log(toilet);
})
;

*/



