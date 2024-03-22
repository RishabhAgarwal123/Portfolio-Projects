// First Available Meeting Slot [Algorithmic] - (Medium, Google)
// You are given a list of schedules for different people, each represented as an array of time intervals during which they are 
// busy. Your task is to find the available meeting slots when none of the participants are occupied.

// Input Example:
const schedules = [ [[9, 12], [14, 16], [20, 22]], [[8, 10], [11, 12], [15, 18]], [[9, 11], [12, 13], [16, 17]] ]; 

// Output Example:
// [ [0, 8], [13, 14], [18, 20], [22, 24] ]

function findMeetingSlots(schedules) {
    let times = schedules.flat();

    times.sort((a, b) => a - b);

    let result = [];
    let prevEnd = 0;

    times.forEach(time => {
        let [start, end] = time;
        if (prevEnd < start) {
            result.push([prevEnd, start]);
        }
        prevEnd = Math.max(end, prevEnd);
    });

    if (prevEnd !== 24) result.push([prevEnd, 24]);
    console.log(result)
    alert(`Input: ${schedules}\nOutput: ${result}`)
    return result;
}

document.getElementById('meetingSlots').addEventListener('click', () => findMeetingSlots(schedules));

// The provided code addresses the problem of finding available meeting slots by analyzing the schedules of different individuals. 
// It works as follows:

// The function starts by combining all time intervals from different schedules into a single array called times using the flat method.

// The times array is sorted in ascending order based on the start time of each interval using the sort method with a custom 
// comparator function (a, b) => a[0] - b[0].

// An empty array called result is created to store the available meeting slots.

// The variable prevEnd is initialized to 0. This variable will keep track of the ending time of the previous interval that was 
// processed.

// The code iterates through the sorted time intervals using the forEach loop. For each interval [start, end], it checks whether 
// there is a gap between the previous end time (prevEnd) and the current start time (start). If there is a gap, it means there 
// is an available slot, and [prevEnd, start] is added to the result array.

// The prevEnd is then updated to the maximum value between the current interval's end time (end) and the previous end time. This 
// ensures that overlapping intervals are correctly handled.

// After processing all intervals, the code checks if the last interval's end time is before the end of the day (24). If there is 
// a gap, it adds an available slot from prevEnd to 24.

// Finally, the function returns the result array containing the available meeting slots.

// The code effectively calculates the available time slots for meetings by examining the intervals of busy times and finding the 
// gaps between them. The result is a list of time intervals during which no participants are occupied.