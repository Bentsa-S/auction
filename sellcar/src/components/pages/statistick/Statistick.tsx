import Bet from "./bet/Bet"
import CumulativeChart from "./chart/CumulativeChart"
import Description from "./destription/Description"
import Slider from "./slider/Slider"



const Statistick = () => {
    return(
        <div>
            <div className="car-details">
                <div className="left-section">
                    <Slider
                    />
                </div>
                <div className='right-section' >
                    <Bet
                        bid={2}
                        startTime={'qwdqwd'}
                        durationMinutes={10}
                        minBid={11}
                        currentUserBid={1}
                        totalPrice={1 + 200}
                    />
                </div>
                <div className='right-section' >
                    <Description
                        description={'qwdqwd'}
                    />
                </div>
            </div>

            <CumulativeChart
                data={[
                    { date: '2024-12-14 09:00', amount: 1000, name: 'Іван' },
                    { date: '2024-12-14 10:00', amount: 500, name: 'Оля' },
                    { date: '2024-12-14 12:00', amount: 800, name: 'Іван' },
                    { date: '2024-12-14 14:00', amount: 700, name: 'Марія' },
                    { date: '2024-12-14 16:00', amount: 1200, name: 'Олег' },
                ]}            
            />

        </div>
    )
}

export default Statistick