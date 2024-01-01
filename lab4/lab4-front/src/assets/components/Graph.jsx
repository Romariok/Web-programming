import { getTry, sendTry, appSelector } from "../../storage/slices/AppSlice.jsx";
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { showPointer, hidePointer, pointerSelector } from "../../storage/slices/PointerSlice.jsx";

export default function Graph(props) {
   const dispatch = useDispatch();
   const svgRef = useRef(null);
   const pointerRef = useRef(null);
   const [formData, setFormData] = useState({
      x: '',
      y: '',
      r: '',
      token: localStorage.getItem('token')
   });
   const { pointerVisibility } = useSelector(pointerSelector);
   const { array } = useSelector(appSelector);



   const handleSvgClick = (event) => {
      const svg = svgRef.current;
      if (props.RValid) {
         let position = getMousePosition(svg, event);
         position.x = ((position.x - 150) * props.R / 120).toFixed(3);
         position.y = ((150 - position.y) * props.R / 120).toFixed(3);

         setPointer(position.x, position.y);
         formData.x = position.x;
         formData.y = position.y;
         formData.r = props.R;
         dispatch(sendTry(formData)).then(() => {
            dispatch(getTry());
         });

      }
   };



   function getMousePosition(svg, event) {
      let rect = svg.getBoundingClientRect();
      console.log(event.clientX - rect.left,
         event.clientY - rect.top)
      return {
         x: event.clientX - rect.left,
         y: event.clientY - rect.top
      };
   }


   function setPointer(x, y) {
      console.log(x + " " + y);
      const pointer = pointerRef.current;
      dispatch(showPointer());
      pointer.setAttribute("cx", (x * 120) / props.R + 150);
      pointer.setAttribute("cy", 150 - (y * 120) / props.R);
   }

   useEffect(() => {
      const data = array[array.length - 1];
      if (data !== undefined) setPointer(data.x, data.y);
   }, [array]);

   return (<>
      <svg ref={svgRef} width="300" height="300" xmlns="http://www.w3.org/2000/svg"
         onClick={handleSvgClick}>
         <line x1="0" y1="150" x2="300" y2="150" stroke="#ffffff" />
         <line x1="150" y1="0" x2="150" y2="300" stroke="#ffffff" />
         <polygon points="300,150 295,155 295, 145" fill="#ffffff" stroke="#ffffff" />
         <polygon points="150,0 145,5 155,5" fill="#ffffff" stroke="#ffffff" />
         <text x="282" y="170" className='svg_text'>x</text>
         <text x="163" y="14" className='svg_text'>y</text>
         <line x1="270" y1="148" x2="270" y2="152" stroke="#ffffff" />
         <text x="265" y="140" className='svg_text'>
            <tspan className="graph_value">{props.R}</tspan>
         </text>
         <line x1="210" y1="148" x2="210" y2="152" stroke="#ffffff" />
         <text x="200" y="140" className='svg_text'>
            <tspan className="graph_value">{props.R}</tspan>
            /2
         </text>
         <line x1="90" y1="148" x2="90" y2="152" stroke="#ffffff" />
         <text x="75" y="140" className='svg_text'>-
            <tspan className="graph_value">{props.R}</tspan>
            /2
         </text>
         <line x1="30" y1="148" x2="30" y2="152" stroke="#ffffff" />
         <text x="20" y="140" className='svg_text'>-
            <tspan className="graph_value">{props.R}</tspan>
         </text>
         <line x1="148" y1="30" x2="152" y2="30" stroke="#ffffff" />
         <text x="156" y="35" className='svg_text'>
            <tspan className="graph_value">{props.R}</tspan>
         </text>
         <line x1="148" y1="90" x2="152" y2="90" stroke="#ffffff" />
         <text x="156" y="95" className='svg_text'>
            <tspan className="graph_value">{props.R}</tspan>
            /2
         </text>
         <line x1="148" y1="210" x2="152" y2="210" stroke="#ffffff" />
         <text x="156" y="215" className='svg_text'>-
            <tspan className="graph_value">{props.R}</tspan>
            /2
         </text>
         <line x1="148" y1="270" x2="152" y2="270" stroke="#ffffff" />
         <text x="156" y="275" className='svg_text'>-
            <tspan className="graph_value">{props.R}</tspan>
         </text>

         <polygon points="300,150 295,155 295, 145" fill="#ffffff" stroke="#ffffff" />

         <polygon points="150,0 145,5 155,5" fill="#ffffff" stroke="#ffffff" />

         <rect x="30" y="150" width="120" height="120" fillOpacity="0.4" fill="#ffff00" />

         <polygon points="150,150 150,30  270,150" fillOpacity="0.4" fill="#ffff00" />

         <path d="M150 150 L 150 30 C 150 30 30 30 30 150 L Z" fillOpacity="0.4" fill="#ffff00" />
         <circle ref={pointerRef} id="pointer" r="5" cx="150" cy="150" fillOpacity="0.7" fill="red" stroke="firebrick"
            visibility={pointerVisibility} />

      </svg>
   </>)
}