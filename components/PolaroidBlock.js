export default function PolaroidBlock(props){
    const now = new Date()
    const then = props.timestampRaw
    var dateDiff = {
        inSeconds: function(d1, d2) {
            var t2 = d2.getTime()
            var t1 = d1.getTime()

            return Math.floor((t2-t1))
        },
        inMinutes: function(d1, d2) {
            var t2 = d2.getTime()
            var t1 = d1.getTime()

            return Math.round((((t2-t1) % 86400000) % 3600000) / 60000)
        },
        inHours: function(d1, d2) {
            var t2 = d2.getTime()
            var t1 = d1.getTime()

            return Math.floor(((t2-t1)%86400000)/3600000)
        },
        inDays: function(d1, d2) {
            var t2 = d2.getTime()
            var t1 = d1.getTime()
     
            return Math.floor((t2-t1)/(86400000))
        },
     
        inWeeks: function(d1, d2) {
            var t2 = d2.getTime()
            var t1 = d1.getTime()
     
            return parseInt((t2-t1)/(24*3600*1000*7))
        },
     
        inMonths: function(d1, d2) {
            var d1Y = d1.getFullYear()
            var d2Y = d2.getFullYear()
            var d1M = d1.getMonth()
            var d2M = d2.getMonth()
     
            return (d2M+12*d2Y)-(d1M+12*d1Y)
        },
     
        inYears: function(d1, d2) {
            return d2.getFullYear()-d1.getFullYear()
        }
    }

    if(then > 0){
        const secondsDiff = dateDiff.inSeconds(then, now)
        const minutesDiff = dateDiff.inMinutes(then, now)
        const hoursDiff = dateDiff.inHours(then, now)
        const daysDiff = dateDiff.inDays(then, now)
        const weeksDiff = dateDiff.inWeeks(then, now)
        const monthsDiff = dateDiff.inMonths(then, now)
        const yearsDiff = dateDiff.inYears(then, now)

        var finalTimestamp = ""

        if(yearsDiff >= 1){
            finalTimestamp = `${yearsDiff} year${yearsDiff == 1 ? "" : "s"} ago.`
        } else{
            if(monthsDiff >= 1){
                finalTimestamp = `${monthsDiff} month${monthsDiff == 1 ? "" : "s"} ago.`
            } else{
                if(weeksDiff >= 1){
                    finalTimestamp = `${weeksDiff} week${weeksDiff == 1 ? "" : "s"} ago.`
                } else{
                    if(daysDiff >= 1){
                        finalTimestamp = `${daysDiff} day${daysDiff == 1 ? "" : "s"} ago.`
                    } else{
                        if(hoursDiff >= 1){
                            finalTimestamp = `${hoursDiff} hour${hoursDiff == 1 ? "" : "s"} ago.`
                        } else{
                            if(minutesDiff >= 1){
                                finalTimestamp = `${minutesDiff} minute${minutesDiff == 1 ? "" : "s"} ago.`
                            } else{
                                finalTimestamp = `${secondsDiff} second${secondsDiff == 1 ? "" : "s"} ago.`
                            }
                        }
                    }
                }
            }
        }
    }

    return(
        <>
        {
            props.link ?
                <a href={props.url} className='polaroid-big shrink-0 md:shrink mx-auto w-[15rem]' style={{transform: `rotate(${props.rotate}deg)`}}>
                    <img className="object-cover" src={props.img} alt="" />
                    <div className="grid grid-cols-2">
                        <div className="font-sketch pl-2 pt-2 font-bold">{props.caption}</div>
                        <div className="font-writer pl-2 pt-2 pr-2 justify-self-end">{finalTimestamp}</div>
                    </div>
                </a>
            :
                <div className='polaroid-big grow-0 ml-5 mr-5 mt-3 w-[15rem]' style={{transform: `rotate(${props.rotate}deg)`}}>
                    <img className="object-cover" src={props.img} alt="" />
                    <div className="grid">
                        <div className="font-sketch  pl-2 pt-2 font-bold">{props.caption}</div>
                    </div>
                </div>
        }
        </>
    )
}