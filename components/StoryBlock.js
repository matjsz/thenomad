export default function StoryBlock(props){
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

    return (
        <>
        {
            props.imgLeft ?
                <a href={props.url} className="flex paper-card flex-col items-center bg-secondary text-letter shadow md:flex-row md:max-w-xl font-writer">
                    <div className='polaroid ml-5 mr-5 mb-5 mt-3'>
                        <img className="object-cover w-full h-96 md:h-auto md:w-48" src={props.img} alt="" />
                    </div>
                    <div className="flex flex-col justify-between pt-4 pl-4 pr-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.title}</h5>
                        <p className="mb-3 font-normal text-gray-700">{props.desc}</p>
                        <div className="grid grid-cols-2">
                            <p className="my-6 font-sketch text-gray-700"><strong>{finalTimestamp}</strong></p>
                            <a className="my-6 font-sketch justify-self-end md:mr-5" href={props.url}>Continue reading</a>
                        </div>
                    </div>
                </a>
            :
                <a href={props.url} className="flex paper-card flex-col items-center bg-secondary text-letter shadow md:flex-row md:max-w-xl font-writer">
                    <div className="flex flex-col justify-between pt-4 pl-4 pr-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.title}</h5>
                        <p className="mb-3 font-normal text-gray-700">{props.desc}</p>
                        <div className="grid grid-cols-2">
                            <p className="my-6 font-sketch text-gray-700"><strong>{finalTimestamp}</strong></p>
                            <a className="my-6 font-sketch justify-self-end md:mr-5" href={props.url}>Continue reading</a>
                        </div>
                    </div>
                    <div className='polaroid ml-5 mr-5 mb-5 mt-3'>
                        <img className="object-cover w-full h-96 md:h-auto md:w-48" src={props.img} alt="" />
                        <div class="font-sketch">{props.caption}</div>
                    </div>
                </a>
        }
        </>
    )
}