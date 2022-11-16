import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import InfoCard from "../../components/InfoCard";
import { useGetAllLeadsQuery } from '../../store/services/leadService';
import { fetchLeadsData } from "../../store/reducers/leadReducer"; 
import { useGetCounselorsQuery } from "../../store/services/counselorService";
import { fetchCounselorData } from "../../store/reducers/counselorReducer";

const InfoSection = () => {

  const { data, isFetching } = useGetAllLeadsQuery();
  const response = useGetCounselorsQuery();
  const dispatch = useDispatch();
  let leadsThisMonth = useSelector(state => state.leadReducer.leadsThisMonth);
  let pendingLeads = useSelector(state => state.leadReducer.pendingLeads);
  let newLeadsToday = useSelector(state => state.leadReducer.newLeadsToday);
  let counselorCount = useSelector(state => state.counselorReducer.counselorCount);

  useEffect(() => {
    if(!response.isFetching) {
      dispatch(fetchCounselorData({counselorCount: response?.data?.counselors.length}));
    }
    if(!isFetching) {
      let pendingLeadsCount = [];
      if(data.data) {
        pendingLeadsCount = data?.data?.filter(lead => {
          return lead.status === "Pending";
        });
      }

      if(data.data) {
        const leadsToday = data.data.filter(lead => {
          let date = new Date();
          let leadDate = new Date(lead.date).getDate();
          let leadMonth = new Date(lead.date).getMonth();
          let leadYear = new Date(lead.date).getFullYear();
          let today = date.getDate();
          let currentMonth = date.getMonth();
          let currentYear = date.getFullYear();
  
          return (leadDate === today) && (leadMonth === currentMonth) && (leadYear === currentYear);
        });
  
        const leadDates = data.data.filter((item) => {
          let leadDate = new Date(item.date);
          let leadMonth = leadDate.getMonth();
          const currentMonth = new Date().getMonth();
  
          return leadMonth === currentMonth;
        });
        
        dispatch(fetchLeadsData({ 
          leadsCount: leadDates.length,
          pendingLeads:  pendingLeadsCount.length,
          newLeads: leadsToday.length
        }));
      }
    }

  }, [dispatch, data, isFetching, response]);

  return (
    <div className="lg:flex lg:justify-between">
        <InfoCard headingText="Leads Generated This Month" stat={leadsThisMonth} iconClass="bi bi-person-lines-fill" />
        <InfoCard headingText="Pending Leads" stat={pendingLeads} iconClass="bi bi-stopwatch" />
        <InfoCard headingText="New Leads Added Today" stat={newLeadsToday} iconClass="bi bi-person-plus-fill" />
        <InfoCard headingText="No. of counselors" stat={counselorCount} iconClass="bi bi-people-fill" />
    </div>
  )
}

export default InfoSection