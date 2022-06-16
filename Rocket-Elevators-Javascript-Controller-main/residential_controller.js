/* var elevatorID = 1
var floorRequestButtonID = 1
var callButtonID = 1 */

class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators, _status = "Active") {

        this.amountOfFloors = _amountOfFloors
        this.amountOfElevators = _amountOfElevators
        this.ID = _id
        this.status = _status
        this.elevatorList = []
        this.callButtonList = []
        this.createElevators(_amountOfFloors, _amountOfElevators)
        this.createCallButtons(_amountOfFloors)


    };

    createCallButtons(_amountOfFloors) {

        buttonFloor = 1
        for (var i = 0; i < _amountOfFloors; i++) {
            var callButtonID = i + 1
            if (buttonFloor < _amountOfFloors) //If it 's not the last floor
                var callButton = new CallButton(callButtonID, buttonFloor, "up")
            this.callButtonList.push(callButton)
            if (buttonFloor > 1)
                var callButton = new CallButton(callButtonID, buttonFloor, "down") //id, status, floor, direction
            this.callButtonList.push(callButton)
            buttonFloor += 1

        }
    }
    createElevators(_amountOfFloors, _amountOfElevators) {

        for (var i = 0; i < _amountOfElevators; i++) {
            var elevatorID = i + 1
            var elevator = new Elevator(elevatorID, 1)
            this.elevatorList.push(elevator)
        }
    }
    requestElevator(floor, direction) {

        var elevator = this.findElevator(floor, direction)
        elevator.floorRequestList.push(floor)
        elevator.move()
        // elevator.operateDoors
        return elevator
    }

    findElevator(requestedFloor, requestedDirection) {

        var bestElevator = this.elevatorList[0]
        var bestScore = 5
        var referenceGap = 10000000

        this.elevatorList.forEach((elevator) => {

            if (requestedFloor == elevator.currentFloor && elevator.status == "stopped" && requestedDirection ==
                elevator.direction) {

                bestElevatorInformation = this.checkIfElevatorIsBetter(1, elevator, bestScore, referenceGap,
                    bestElevator, requestedFloor)

            } else if (requestedFloor > elevator.currentFloor && elevator.direction == "up" &&
                requestedDirection ==
                elevator.direction) {

                bestElevatorInformation = this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap,
                    bestElevator, requestedFloor)
            } else if (requestedFloor < elevator.currentFloor && elevator.direction == "down" &&
                requestedDirection ==
                elevator.direction) {

                bestElevatorInformation = this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap,
                    bestElevator, requestedFloor)

            } else if (elevator.status == "idle") {

                bestElevatorInformation = this.checkIfElevatorIsBetter(3, elevator, bestScore, referenceGap,
                    bestElevator, requestedFloor)

            } else {

                bestElevatorInformation = this.checkIfElevatorIsBetter(4, elevator, bestScore, referenceGap,
                    bestElevator, requestedFloor)

            }

            bestElevator = bestElevatorInformation.bestElevator
            bestScore = bestElevatorInformation.bestScore
            referenceGap = bestElevatorInformation.referenceGap

        });
        return bestElevator
    }

    checkIfElevatorIsBetter(scoreToCheck, newElevator, bestScore, referenceGap, bestElevator, floor) {

        if (coreToCheck < bestScore) {

            bestScore = scoreToCheck
            bestElevator = newElevator
            referenceGap = Math.abs(newElevator.currentFloor - floor)

        } else if (bestScore == scoreToCheck) {
            gap = Math.abs(newElevator.currentFloor - floor)
            if (referenceGap > gap) {

                bestElevator = newElevator
                referenceGap = gap
            }
        }
        return BestElevatorInfo(bestElevator, bestScore, referenceGap)

    }

}




class Elevator {
    constructor(_id, _currentFloor, _status = "idle") {

        this.ID = _id
        this.status = _status
        this.currentFloor = _currentFloor
        this.direction = None
        var door = new Door(_id)
        this.door = door
        this.floorRequestList = []
        this.floorRequestButtonList = []
        this.createFloorRequestButtons(_currentFloor)

    };

    createFloorRequestButtons(_amountOfFloors) {
        buttonFloor = 1

        for (var i = 0; i < _amountOfFloors; i++) {

            floorRequestButtonID = i + 1
            floorRequestButton = FloorRequestButton(floorRequestButtonID, buttonFloor)
            this.floorRequestButtonList.push(floorRequestButton)
            buttonFloor += 1
            floorRequestButtonID += 1

        }
    }
    requestFloor(floor) {
        this.floorRequestList.push(floor)
        this.move()
        //this.operateDoors
    }

    move() {

        while (this.floorRequestList.length > 0) {
            destination = this.floorRequestList[0]
            this.status = "moving"
            if (this.currentFloor > destination) {
                this.direction = "down"
                this.sortFloorList()
                while (this.currentFloor > destination) {
                    this.currentFloor = this.currentFloor - 1
                    this.screenDisplay = this.currentFloor
                }
            } else if (this.currentFloor < destination) {
                this.direction = "up"
                this.sortFloorList()
                while (this.currentFloor < destination) {

                    this.currentFloor += 1
                    this.screenDisplay = this.currentFloor
                    this.status = "stopped"
                    this.floorRequestList.pop(0)
                }
            }
        }
        this.status = "idle"
    }

    sortFloorList() {

        if (this.direction == "up") {

            this.floorRequestList.sort()
        } else {
            this.floorRequestList.sort().reverse()
        }

    }

}

class BestElevatorInfo {
    constructor(this, bestElevator, bestScore, referenceGap) {

        this.bestElevator = bestElevator
        this.bestScore = bestScore
        this.referenceGap = referenceGap
    }

}





class CallButton {
    constructor(_id, _floor, _direction, _status = "Active") {

        this.ID = _id
        this.status = _status
        this.floor = _floor
        this.direction = _direction
    }
}

class FloorRequestButton {
    constructor(_id, _floor, _status = "Active") {

        this.ID = _id
        this.status = _status
        this.floor = _floor
    }
}

class Door {
    constructor(_id, _status = "Active") {

        this.ID = _id
        this.status = _status
    }
}

module.exports = {
    Column,
    Elevator,
    CallButton,
    FloorRequestButton,
    Door
}