
function calculate(data) {
    var tasks = data.tasks;
    return getPoints(tasks);
}

function getPoints(tasks) {
    var DAY = 86400000;
    tasks = tasks.sort(function(a,b){return (a.startDate + a.workingDays * DAY) - (b.startDate + b.workingDays * DAY)});
    var initPoint = tasks[0].startDate;
    var accumulateValue = 0;
    var points = [];
    tasks.map(function(task){
        var endDate = task.startDate + (task.workingDays * DAY);
        var x = (endDate-initPoint)/DAY;       
        points.push([x,accumulateValue]);
        accumulateValue += task.value;
        points.push([x+1, accumulateValue])
    });

    var pointSet = {};
    while (points.length > 0) {
        var point = points.shift();
        var x = point[0];
        var y = point[1];
        if (x in pointSet) {
            pointSet[x] += y;
        }
        else {
            pointSet[x] = y;
        }
    }
    points.push([0,0]);
    for (var x in pointSet) {
        points.push([x,pointSet[x]]);
    }

    return points;
}


var sample = {
   tasks: [
      {
          "name": "task1",
          "workingDays": 8,
          "startDate": 1234141312,
          "value": 100
      },
      {
        "name": "task1",
          "workingDays": 5,
          "startDate": 1320541312,
          "value": 10
      },
      {
        "name": "task1",
          "workingDays": 3,
          "startDate": 1234141312,
          "value": 10
      }
   ]
};

