import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const SlotListing = () => {
    const [searchDate, setSearchDate] = useState(
        new Date().toISOString().substring(0, 10)
    );
    const [slotsFound, setSlotsFound] = useState([]);

    const slots = useSelector((state) => state.slots.slots);

    useEffect(() => {
        let temp = slots.filter(
            (item) => item.date === new Date(searchDate).toLocaleDateString()
        );
        setSlotsFound(temp);
    }, [searchDate]);

    return (
        <div className="create-slot-div">
            <Header header="appointment slots" />
            <div className="slots-filter row">
                <div className="search-slots col-7">
                    <input className="form-control" placeholder="Search" />
                    <i className="fa-solid fa-magnifying-glass search-slots-icon"></i>
                </div>
                <div className="col-3">
                    <input
                        type="date"
                        defaultValue={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="form-control search-slot-date"
                    />
                </div>
                <div className="form-group col-2">
                    <button
                        type="button"
                        className="btn btn-md btn-success search-button-slots"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="slots-table">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Slot Timing</th>
                            <th scope="col">Seating Capacity</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slotsFound.length > 0 ? (
                            slotsFound.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">
                                        <input type="checkbox" name="" />
                                    </th>
                                    <td>
                                        {item.from} - {item.to}
                                    </td>
                                    <td>{item.capacity}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary delete-slot">
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                        <button className="btn btn-sm btn-danger delete-slot">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}><h5>No slots found</h5></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SlotListing;
