function filterUpcomingEvents (allEvents, currentDate){
    const filteredEvents = allEvents.filter((event) => event.date >= currentDate )
    return filteredEvents
}

function filterPastEvents (allEvents, currentDate){
    const filteredEvents = allEvents.filter((event) => event.date < currentDate )
    return filteredEvents
}

function getAssistance (event){
    return event.assistance || event.estimate
}
function calculateAllEventsStatistics(high,low,allEventsHighcapacity, rows){

}

function calculateStats (events, currentDate){
const upComingEvents = filterUpcomingEvents(events, currentDate)
const pastEvents = filterPastEvents(events, currentDate)
const allEventsHighAssistance = events.sort((a, b) => ( getAssistance(a) / a.capacity * 100) - (getAssistance(b)/ b.capacity * 100));
const allEventsLowestAssistance = [...allEventsHighAssistance].reverse()
const allEventsHighcapacity = events.sort((a, b) => a.capacity - b.capacity );
const allEventsStatisticsArray = calculateAllEventsStatistics(allEventsHighAssistance,allEventsLowestAssistance,allEventsHighcapacity, 3)

console.log({allEventsHighAssistance, allEventsLowestAssistance, events, upComingEvents, pastEvents, allEventsHighcapacity})
}







// carga inical
fetch('https://mindhub-xj03.onrender.com/api/amazing').then((promesaSolved)=> promesaSolved.json()).then((res)=>{
calculateStats(res.events, res.currentDate)
})

