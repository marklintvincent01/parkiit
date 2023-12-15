import React, { useEffect, useState } from 'react';
import { VictoryArea, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { db } from './firebase'; // Import your Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';

import './globals.css'; // Import the CSS file

const incomingLogsData = [
  { id: '14', time: new Date('2023-12-14T06:00:00'), trafficDensity: 20 },
  { id: '15', time: new Date('2023-12-14T07:00:00'), trafficDensity: 30 },
  { id: '16', time: new Date('2023-12-14T08:00:00'), trafficDensity: 40 },
  { id: '17', time: new Date('2023-12-14T09:00:00'), trafficDensity: 50 },
  { id: '5', time: new Date('2023-12-14T10:00:00'), trafficDensity: 60 },
  { id: '6', time: new Date('2023-12-14T11:00:00'), trafficDensity: 70 },
  { id: '7', time: new Date('2023-12-14T12:00:00'), trafficDensity: 80 },
  { id: '15', time: new Date('2023-12-14T13:00:00'), trafficDensity: 90 },
  { id: '9', time: new Date('2023-12-14T14:00:00'), trafficDensity: 80 },
  { id: '10', time: new Date('2023-12-14T15:00:00'), trafficDensity: 70 },
  { id: '11', time: new Date('2023-12-14T16:00:00'), trafficDensity: 60 },
  { id: '12', time: new Date('2023-12-14T17:00:00'), trafficDensity: 50 },
  { id: '13', time: new Date('2023-12-14T18:00:00'), trafficDensity: 40 },
];

// Dummy data for outgoing logs
const outgoingLogsData = [
  { id: '14', time: new Date('2023-12-14T06:00:00'), trafficDensity: 30 },
  { id: '15', time: new Date('2023-12-14T07:00:00'), trafficDensity: 40 },
  { id: '16', time: new Date('2023-12-14T08:00:00'), trafficDensity: 50 },
  { id: '17', time: new Date('2023-12-14T09:00:00'), trafficDensity: 60 },
  { id: '18', time: new Date('2023-12-14T10:00:00'), trafficDensity: 70 },
  { id: '19', time: new Date('2023-12-14T11:00:00'), trafficDensity: 80 },
  { id: '20', time: new Date('2023-12-14T12:00:00'), trafficDensity: 90 },
  { id: '21', time: new Date('2023-12-14T13:00:00'), trafficDensity: 80 },
  { id: '22', time: new Date('2023-12-14T14:00:00'), trafficDensity: 70 },
  { id: '23', time: new Date('2023-12-14T15:00:00'), trafficDensity: 60 },
  { id: '24', time: new Date('2023-12-14T16:00:00'), trafficDensity: 50 },
  { id: '25', time: new Date('2023-12-14T17:00:00'), trafficDensity: 40 },
  { id: '26', time: new Date('2023-12-14T18:00:00'), trafficDensity: 30 },
];

const combinedLogs = [...incomingLogsData, ...outgoingLogsData];

export default function Home() {
  const [incomingLogs, setIncomingLogs] = useState(incomingLogsData);
  const [outgoingLogs, setOutgoingLogs] = useState(outgoingLogsData);
  const [incomingLogsRes, setIncomingLogsRes] = useState({});
  const [outgoingLogsRes, setOutgoingLogsRes] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showCarsT, setShowCarsT] = useState(true);
  const [showChart, setShowChart] = useState(true);
  const [showName, setShowName] = useState(false);
  const [totalCarsInside, setTotalCarsInside] = useState(0);
  const [incomingWithoutOutgoingCount, setIncomingWithoutOutgoingCount] = useState(0);
  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const searchCaps = searchTerm.toUpperCase();
        const incomingQuery = query(collection(db, 'INCOMING'), where('name', '==', searchCaps));
        const outgoingQuery = query(collection(db, 'OUTGOING'), where('name', '==', searchCaps));

        const [incomingSnapshot, outgoingSnapshot] = await Promise.all([
          getDocs(incomingQuery),
          getDocs(outgoingQuery),
        ]);

        const incomingLogsData1 = incomingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const outgoingLogsData1 = outgoingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setIncomingLogsRes(incomingLogsData1);
        setOutgoingLogsRes(outgoingLogsData1);

        const incomingWithoutOutgoing = incomingLogsData.filter(
          (incomingLog) => !outgoingLogsData.some((outgoingLog) => outgoingLog.id === incomingLog.id)
        );
        setIncomingWithoutOutgoingCount(incomingWithoutOutgoing.length);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    if (searchTerm) {
      fetchTrafficData();
    }
  }, [searchTerm, incomingLogsData]);

  useEffect(() => {
    const fetchTotalCars = async () => {
      const incomingQuery = query(collection(db, 'INCOMING'));
      const outgoingQuery = query(collection(db, 'OUTGOING'));

      const [incomingSnapshot, outgoingSnapshot] = await Promise.all([
        getDocs(incomingQuery),
        getDocs(outgoingQuery),
      ]);

      const incomingLogsDataTotal = incomingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const outgoingLogsDataTotal = outgoingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const incomingTotal = Object.entries(incomingLogsDataTotal).length;
      const outgoingTotal = Object.entries(outgoingLogsDataTotal).length;

      const totalCars = incomingTotal - outgoingTotal;
      setTotalCarsInside(totalCars);
    };
    fetchTotalCars();
  }, []);

  const findBusyAndLeastBusyHour = (logs: any) => {
    const busiestHour = logs.reduce(
      (prev: any, current: any) => (prev.trafficDensity > current.trafficDensity ? prev : current),
      {}
    );

    const leastBusyHour = logs.reduce(
      (prev: any, current: any) => (prev.trafficDensity < current.trafficDensity ? prev : current),
      {}
    );

    return { busiestHour, leastBusyHour };
  };

  const { busiestHour: busiestHourIncoming, leastBusyHour: leastBusyHourIncoming } =
    findBusyAndLeastBusyHour(incomingLogs);

  const { busiestHour: busiestHourOutgoing, leastBusyHour: leastBusyHourOutgoing } =
    findBusyAndLeastBusyHour(outgoingLogs);

  const formatHour = (hour: any) => {
    const suffix = hour < 12 ? 'am' : 'pm';
    const formattedHour = hour === 0 || hour === 12 ? 12 : hour % 12;
    return `${formattedHour} ${suffix}`;
  };

  const handleSearch = () => {
    setShowChart(false);    
  };

  const handleBack = () => {
    setSearchTerm('');
    setShowChart(true);
    setShowName(false);
    setShowCarsT(true);
    setOutgoingLogsRes({});
  };

  return (
    <main className="flex flex-col">
                <div className="datan  mb-2">ANALYTICS</div>
      <div className="flex flex-col p-5 might rounded-lg border-2">
        <div className="flex justify-between">
          <div className="p-2 max-w-[200px] min-w-[160px] break-words ">
            <div className="mate">
              {showCarsT && 
                <div className="mayl font-semibold w-[350px]">Cars Currently Inside MSU-IIT: <div className="numbr">{totalCarsInside}</div></div>
              }
            </div>
            <div className="flex flex-col mb-2 text-sm">
              <div className="w-60 name">
                {showName && 
                  <div className='nam'>ID: {searchTerm.toUpperCase()}</div>
                }
              </div>
            </div>
          </div>
          <div className="relative max-h-[30px] rounded-[8px] overflow-hidden">
            {showChart ? (
              <input
                type="text"
                className="search w-full h-full p-2 pl-2 pr-2 text-sm rounded-[8px] focus:outline-none"
                placeholder="Search Vehicle ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    if (searchTerm !== '') {
                      handleSearch();
                      setShowName(true);
                      setShowCarsT(false);


                    }
                  }
                }}
              />
            ) : (
              <div
                className="search w-full h-full p-2 pl-2 pr-2 text-sm rounded-[8px] focus:outline-none"
                onClick={handleBack}
              >
                Back
              </div>
            )}
          </div>
        </div>
        {showChart ? (
          <div>
            <div className="flex justify-center w-[100%] font-bold">Incoming</div>
            <div className="max-h-[70%]">
              <VictoryChart theme={VictoryTheme.material} width={600} height={300} style={{ maxWidth: '600px', maxHeight: '200px' }}>
                <VictoryAxis tickFormat={(tick) => new Date(tick).toLocaleString('en-US', { hour: 'numeric', hour12: true })} />
                <VictoryAxis dependentAxis tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
                <VictoryArea
                  style={{
                    data: {
                      fill: '#ccccff',
                      fillOpacity: 0.4,
                      stroke: 'rgb(133 174 255)',
                      strokeWidth: 2,
                    },
                  }}
                  data={incomingLogsData}
                  x="time"
                  y="trafficDensity"
                  interpolation="natural"
                />
              </VictoryChart>
            </div>
            <div className="flex justify-center w-[100%] font-bold">Outgoing</div>
            <div className="max-h-[70%]">
              <VictoryChart theme={VictoryTheme.material} width={600} height={300}>
                <VictoryAxis tickFormat={(tick) => new Date(tick).toLocaleString('en-US', { hour: 'numeric', hour12: true })} />
                <VictoryAxis dependentAxis tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
                <VictoryArea
                  style={{
                    data: {
                      fill: '#ccccff',
                      fillOpacity: 0.4,
                      stroke: 'rgb(133 174 255)',
                      strokeWidth: 2,
                    },
                  }}
                  data={outgoingLogsData}
                  x="time"
                  y="trafficDensity"
                  interpolation="natural"
                />
              </VictoryChart>
            </div>
            <div className="flex">
              <div className="flex flex-col gap-5 max-w-sm ml-[30px mt-10]">
                <div className="text-sm font-bold">
                  Peak hour for incoming: <div className="font-bold number p-5 flex">{formatHour(busiestHourIncoming.time?.getHours())}</div>
                </div>
                <div className="text-sm font-bold">
                  Least busy hour for incoming: <div className="font-bold number p-5 flex">{formatHour(leastBusyHourIncoming.time?.getHours())}</div>
                </div>
                <div className="text-sm font-bold">
                  Peak hour for outgoing: <div className="font-bold number p-5 flex">{formatHour(busiestHourOutgoing.time?.getHours())}</div>
                </div>
                <div className="text-sm font-bold">
                  Least busy hour for outgoing: <div className="font-bold number p-5 flexr">{formatHour(leastBusyHourOutgoing.time?.getHours())}</div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-2">
            {Object.keys(incomingLogsRes).length > 0 ? (
              <div>
                <div className="inc">Incoming</div>
                <div className="logs-container">
                  {Object.entries(incomingLogsRes).map(([key, log]) => (
                    <div key={key} className="log-item">
                      <span className="log-label text-sm">Date & Time</span> {log.time.toDate().toLocaleString()}
                      <span className="log-label"></span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="non rounded-[8px] p-">
                <p>No incoming data available.</p>
              </div>
            )}

            {Object.keys(outgoingLogsRes).length > 0 ? (
              <div>
                <div className="out">Outgoing</div>
                <div className="logs-container">
                  {Object.entries(outgoingLogsRes).map(([key, log]) => (
                    <div key={key} className="log-item">
                      <span className="log-label text-sm">Date & Time</span> {log.time.toDate().toLocaleString()}
                      <span className="log-label"></span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border p-3">
                <p>No outgoing data available.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
