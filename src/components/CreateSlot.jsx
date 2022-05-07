import * as moment from "moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSlots } from "../store/reducers/slotSlice";
import createIntervals from "../utils/createIntervals";
import padleadingZeros from "../utils/padLeadingZeros";
import Header from "./Header";
import { appRoutes } from "./Navigation";

const CreateSlot = () => {
    const [dateSelected, setDateSelected] = useState(new Date());
    const [seatingCapacity, setSeatingCapacity] = useState(0);
    const [startHour, setStartHour] = useState(
        new Date().getHours().toString()
    );
    const [startMinute, setStartMinute] = useState(null);
    const [endHour, setEndHour] = useState("00");
    const [endMinute, setEndMinute] = useState(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const inputChangeHandler = (e, handler) => {
        handler(e.target.value);
    };

    const createSlots = async () => {
        if (!startHour || !startMinute || !endHour || !endMinute) {
            alert("Please select date and time.");
            return;
        }
        const [start, end] = [
            `${startHour}:${startMinute}`,
            `${endHour}:${endMinute}`,
        ];
        let slots = createIntervals(start, end);
        slots = slots.map((item) => {
            return {
                date: new Date(dateSelected).toLocaleDateString(),
                from: item.from,
                to: item.to,
                capacity: 0,
            };
        });
        let cap = +seatingCapacity;
        while (cap > 0) {
            let temp = cap;
            for (let i = slots.length - 1; i >= 0; i--) {
                if (temp > 0) {
                    slots[i].capacity = slots[i].capacity + 1;
                }
                temp--;
            }
            cap = cap - slots.length;
        }
        await dispatch(addSlots({ slots }));
        alert("Slots has been created.");
        navigate(appRoutes.SLOT_LIST);
    };

    return (
        <div className="create-slot-div">
            {/* header */}
            <Header header="create appointment slots" />

            {/* body */}
            <div className="create-slot-body row">
                {/* step 1 */}
                <div className="first-step col-4">
                    <label>
                        1. SELECT DATE OF APPOINTMENT <sup>*</sup>
                    </label>
                    <p>
                        Please select the dates that you'd like to open up
                        slots.
                    </p>
                    <div className="calendar-div">
                        <Calendar
                            onChange={setDateSelected}
                            minDate={new Date()}
                            value={dateSelected}
                        />
                    </div>
                </div>

                {/* step 2 */}
                <div className="second-step col-4">
                    <label>
                        1. SELECT THE HOURS <sup>*</sup>
                    </label>
                    <p>Please select the Start and End Time.</p>
                    <div className="timepicker-div">
                        <div className="start-time-div">
                            <div>
                                <label>Start Hour</label>
                                <HourInput
                                    type="startHour"
                                    dateSelected={dateSelected}
                                    setEndHours={setEndHour}
                                    onChange={(e) =>
                                        inputChangeHandler(e, setStartHour)
                                    }
                                />
                            </div>
                            <div>
                                <label>Minute</label>
                                <MinuteInput
                                    dateSelected={dateSelected}
                                    type="startMinute"
                                    onChange={(e) =>
                                        inputChangeHandler(e, setStartMinute)
                                    }
                                />
                            </div>
                            <p className="bottom-label">
                                Please select the Start Time.
                            </p>
                        </div>

                        <strong className="colon">:</strong>

                        <div className="end-time-div">
                            <div>
                                <label>End Hour</label>
                                <HourInput
                                    type="endHour"
                                    dateSelected={dateSelected}
                                    startHours={startHour}
                                    startMinutes={startMinute}
                                    disabled={!startMinute}
                                    onChange={(e) =>
                                        inputChangeHandler(e, setEndHour)
                                    }
                                />
                            </div>
                            <div>
                                <label>Minute</label>
                                <MinuteInput
                                    type="endMinute"
                                    dateSelected={dateSelected}
                                    startHours={startHour}
                                    startMinutes={startMinute}
                                    setEndHours={setEndHour}
                                    endHours={endHour}
                                    disabled={!startMinute}
                                    onChange={(e) =>
                                        inputChangeHandler(e, setEndMinute)
                                    }
                                />
                            </div>
                            <p className="bottom-label">
                                Please select the time your last 15 min Block
                                Starts.
                            </p>
                        </div>
                    </div>
                </div>

                {/* step 3 */}
                <div className="third-step col-4">
                    <label>
                        1. CHOOSE SEATING CAPACITY <sup>*</sup>
                    </label>
                    <p>Please enter total Seating Capacity.</p>
                    <div className="capacity-div">
                        <input
                            className="form-control seat-cap"
                            type="number"
                            id="seatCapacity"
                            defaultValue={seatingCapacity}
                            onWheel={(e) => e.target.blur()}
                            min="0"
                            onChange={(e) => {
                                setSeatingCapacity(Number(e.target.value));
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* footer */}
            <div className="create-slot-footer">
                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-lg btn-light cancel-button"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-lg btn-primary submit-button"
                        onClick={createSlots}
                    >
                        Create Slots
                    </button>
                </div>
            </div>
        </div>
    );
};

const HourInput = ({
    type,
    onChange,
    dateSelected,
    setEndHours = false,
    startHours,
    startMinutes,
    disabled = false,
}) => {
    let hourArr = [];
    let i = 0;
    while (i < 24) {
        if (type === "startHour") {
            if (moment(dateSelected).isSame(new Date(), "day")) {
                if (i > new Date().getHours())
                    hourArr.push(padleadingZeros(i, 2));
            } else {
                hourArr.push(padleadingZeros(i, 2));
            }
        } else {
            if (+startMinutes >= 45 && i > +startHours) {
                hourArr.push(padleadingZeros(i, 2));
            } else if (+startMinutes < 45 && i >= +startHours) {
                hourArr.push(padleadingZeros(i, 2));
            } else if (i > +startHours) {
                hourArr.push(padleadingZeros(i, 2));
            }
        }
        i++;
    }

    return (
        <select
            className="form-control"
            disabled={disabled}
            onChange={onChange}
            defaultValue=""
        >
            <option disabled selected value="">
                Hour
            </option>
            {hourArr.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};

const MinuteInput = ({
    type,
    onChange,
    startHours,
    dateSelected,
    startMinutes,
    endHours,
    setEndHours,
    disabled = false,
}) => {
    let MinuteArr = [];
    let i = 0;
    while (i < 46) {
        if (i == 0 || i == 15 || i == 30 || i == 45) {
            if (type === "startMinute") {
                MinuteArr.push(padleadingZeros(i, 2));
            } else {
                console.log(+startHours, +endHours, +startMinutes);
                if (startHours == endHours) {
                    if (i > +startMinutes) {
                        MinuteArr.push(padleadingZeros(i, 2));
                    }
                } else if (+endHours > +startHours) {
                    MinuteArr.push(padleadingZeros(i, 2));
                }
            }
        }
        i++;
    }
    return (
        <select
            className="form-control"
            disabled={disabled}
            onChange={onChange}
            defaultValue=""
        >
            <option disabled selected value="">
                Minute
            </option>
            {MinuteArr.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};

export default CreateSlot;
