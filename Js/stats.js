const rowsToFill = 3

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

// ------ Rows to fill ------
function calculateAllEventsStatistics(high, low, capacity, rows){
const result = []
for (let i = 0; i < rows; i++) {
    const rowData = {
        highAssistance: high[i],
        lowAssistance: low[i],
        capacity: capacity[i]
    }
    result.push(rowData)
}

return result
}

// ------ Data for TAble ------
function infoTable (events, currentDate){
const upComingEvents = filterUpcomingEvents(events, currentDate)
const pastEvents = filterPastEvents(events, currentDate)
const allEventsLowestAssistance = events.sort((a, b) => ( getAssistance(a) / a.capacity * 100) - (getAssistance(b)/ b.capacity * 100));
const allEventsHighAssistance = [...allEventsLowestAssistance].reverse()
const allEventsHighcapacity = events.sort((a, b) => a.capacity - b.capacity );


const allEventsStatisticsArray = calculateAllEventsStatistics(allEventsHighAssistance,allEventsLowestAssistance,allEventsHighcapacity, rowsToFill)

console.log({allEventsStatisticsArray})
}






//------ Import Data from APi ------
fetch('https://mindhub-xj03.onrender.com/api/amazing').then((promesaSolved)=> promesaSolved.json()).then((res)=>{
infoTable(res.events, res.currentDate)
})

