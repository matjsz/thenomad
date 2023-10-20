import React from 'react'

class BuyMeACoffe extends React.Component {
    constructor(props){
        super(props)
        let script = document.createElement("script");
        script.setAttribute('data-name','BMC-Widget')
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        script.setAttribute('data-id', 'thenomad');
        script.setAttribute('data-font', 'Bree')
        script.setAttribute('data-description', 'Thank you for your support!');
        script.setAttribute('data-message', 'If you want to to help me in some way, maybe you could buy me a coffee!');
        script.setAttribute('data-color',"#2e261b")
        script.setAttribute('data-position','right')
        script.setAttribute('data-x_margin','18')
        script.setAttribute('data-y-margin','18')
        script.async = true
        //Call window on load to show the image
        script.onload=function(){
            var evt = document.createEvent('Event');  
            evt.initEvent('DOMContentLoaded', false, false);  
            window.dispatchEvent(evt);
        }
        this.script=script
    }

    componentDidMount () {    
        document.head.appendChild(this.script)
    }

    render(){
        return(null)
    }
}

module.exports = BuyMeACoffe