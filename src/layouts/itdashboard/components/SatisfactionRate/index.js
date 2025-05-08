import React from 'react';
import { Card } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter } from 'layouts/itdashboard/data/pieChartData';

const SatisfactionRate = () => {
	const truncateLabel = (label, maxLength = 6) => {
		return label.length > maxLength ? `${label.slice(0, maxLength)}..` : label;
	};

	return (
		<Card sx={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
		<VuiBox display='flex' flexDirection='column' height="100%" width="100%">
			<VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
				Employees per Department
			</VuiTypography>
	
			{/* Wrapper to control pie chart size */}
			<VuiBox sx={{ width: '90%', height: '90%', maxWidth: 600, maxHeight: 600, margin: 'auto' }}>
				<PieChart 
					width={300}  // ✅ Use pixels for actual rendering size
					height={300} // ✅ Makes sure the pie chart is big
					series={[
						{
							data: desktopOS,
							highlightScope: { fade: 'global', highlight: 'item' },
							faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
							valueFormatter,
							paddingAngle: 0,
							cornerRadius: 0,
							
							arcLabelMinAngle: 10,
							arcLabelStyle: {
								color: 'white',
								fontSize: 'clamp(5px, 2vw, 10px)', // Ensure text is readable
								fontWeight: 600,
							},
						},
					]}
					slotProps={{ 
						legend: { 
							hidden: false,
							direction: 'row',
							position: { vertical: 'bottom', horizontal: 'left' },
							padding: 0,
							
							labelStyle: { 
								fill: 'white',
								fontSize: 'clamp(5px, 2vw, 9.5px)', 
								fontWeight: 600 
							},
							itemMarkWidth: 20,
							itemMarkHeight: 2,
							markGap: 5,
							itemGap: 20,
							
							
						},
						pieArc: { strokeWidth: 0, stroke: "none" }
					}}
					sx={{
						"& .MuiPieArc-root": { stroke: "none", strokeWidth: 0 },
						"& .MuiChartsLegend-label": { fill: "white" },
						"& .MuiPieArcLabel-root": { fill: "white", fontSize: "clamp(5px, 2vw, 9.5px)", fontWeight: 600 },
					}}
				/>
			</VuiBox>
		</VuiBox>
	</Card>
	

	);
};

export default SatisfactionRate;
