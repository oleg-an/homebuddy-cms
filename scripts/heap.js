const heapScript = ({
  contractorId,
  contractorName,
}) => `window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
heap.load("1720263729");
heap.identify('${contractorId}');
heap.addUserProperties({'contractor_name': '${contractorName}',
'contractor_id': '${contractorId}'});
`;

const HEAP_CLASS_NAME = 'heap';

export const addHeapScript = ({ contractorId, contractorName }) => {
  if (window.location.hostname !== 'app.homebuddy.com') {
    return;
  }

  if (document.querySelector(`.${HEAP_CLASS_NAME}`)) {
    return;
  }

  const element = document.createElement('script');

  element.classList.add(HEAP_CLASS_NAME);

  element.type = 'text/javascript';
  element.innerHTML = heapScript({ contractorId, contractorName });

  document.querySelector('head').appendChild(element);
};
