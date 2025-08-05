import React, { useEffect, useRef } from 'react';
import * as createjs from '@createjs/easeljs';

const Chart = () => {
  const canvasRef = useRef(null);
  
  const financialData = [
    { month: "Jan", value: 50 },
    { month: "Feb", value: 65 },
    { month: "Mar", value: 72 },
    { month: "Apr", value: 68 },
    { month: "May", value: 85 },
    { month: "Jun", value: 95 },
    { month: "Jul", value: 88 },
    { month: "Aug", value: 105 },
    { month: "Sep", value: 110 },
    { month: "Oct", value: 98 },
    { month: "Nov", value: 120 },
    { month: "Dec", value: 135 }
  ];

  const padding = 50;
  const lineColor = "#4f46e5";
  const gridColor = "#e5e7eb";
  const textColor = "#4b5563";
  const tooltipBackgroundColor = "#333";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let stage = new createjs.Stage(canvas);
    stage.enableMouseOver(10);
    
    const handleResize = () => {
      const parentDiv = canvas.parentElement;
      const newWidth = parentDiv.offsetWidth - 32; 
      canvas.width = newWidth > 800 ? 800 : newWidth;
      canvas.height = canvas.width / 2; 
      
      stage.removeAllChildren();
      drawChart(stage, canvas);
      stage.update();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    createjs.Ticker.on("tick", stage);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;

    return () => {
      window.removeEventListener('resize', handleResize);
      createjs.Ticker.off("tick", stage);
      stage.removeAllChildren();
      stage.clear();
    };
  }, []);

  const showTooltip = (stage, data, x, y) => {
    stage.removeChild(stage.getChildByName("tooltip"));
    
    const tooltip = new createjs.Container();
    tooltip.name = "tooltip";
    
    const background = new createjs.Shape();
    background.graphics.beginFill(tooltipBackgroundColor).drawRoundRect(0, 0, 100, 40, 5);
    
    const valueText = new createjs.Text(`$${data.value}`, "bold 14px Inter", "#fff");
    valueText.x = 50;
    valueText.y = 5;
    valueText.textAlign = "center";
    
    const monthText = new createjs.Text(data.month, "12px Inter", "#fff");
    monthText.x = 50;
    monthText.y = 22;
    monthText.textAlign = "center";
    
    tooltip.addChild(background, valueText, monthText);
    
    tooltip.x = x - 50;
    tooltip.y = y - 50;
    
    stage.addChild(tooltip);
    stage.update();
  };

  const drawChart = (stage, canvas) => {
    if (!stage || !canvas) return;

    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    const values = financialData.map(d => d.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    const title = new createjs.Text("Stock Performance (USD)", "20px Inter", textColor);
    title.x = canvas.width / 2;
    title.y = padding / 2;
    title.textAlign = "center";
    stage.addChild(title);

    const yGridCount = 5;
for (let i = 0; i <= yGridCount; i++) {
        const y = padding + (chartHeight / yGridCount) * i;
        
        const gridLine = new createjs.Shape();
        gridLine.graphics.setStrokeStyle(1).beginStroke(gridColor).moveTo(padding, y).lineTo(padding + chartWidth, y);
        stage.addChild(gridLine);
        
        const labelValue = maxValue - ((maxValue - minValue) / yGridCount) * i;
        const yLabel = new createjs.Text(`$${labelValue.toFixed(0)}`, "12px Inter", textColor);
        yLabel.x = padding - 10;
        yLabel.y = y - 8;
        yLabel.textAlign = "right";
        stage.addChild(yLabel);
    }

    const pointWidth = chartWidth / (financialData.length - 1);
    financialData.forEach((data, i) => {
        const x = padding + pointWidth * i;
        const xLabel = new createjs.Text(data.month, "12px Inter", textColor);
        xLabel.x = x;
        xLabel.y = canvas.height - padding + 10;
        xLabel.textAlign = "center";
        stage.addChild(xLabel);
    });

    const chartContainer = new createjs.Container();
    stage.addChild(chartContainer);

    const line = new createjs.Shape();
    line.graphics.setStrokeStyle(3).beginStroke(lineColor);
    
    financialData.forEach((data, i) => {
        const x = padding + pointWidth * i;
        const y = padding + chartHeight - ((data.value - minValue) / (maxValue - minValue)) * chartHeight;
        
        if (i === 0) {
            line.graphics.moveTo(x, y);
        } else {
            line.graphics.lineTo(x, y);
        }
        
        const point = new createjs.Shape();
        point.graphics.beginFill(lineColor).drawCircle(0, 0, 5);
        point.x = x;
        point.y = y;
        
        point.on("mouseover", function(evt) {
            showTooltip(stage, data, evt.target.x, evt.target.y);
        });
        point.on("mouseout", function() {
            stage.removeChild(stage.getChildByName("tooltip"));
            stage.update();
        });

        chartContainer.addChild(point);
    });

    chartContainer.addChild(line);

    
    const axes = new createjs.Shape();
    axes.graphics
        .setStrokeStyle(2)
        .beginStroke(textColor)
        .moveTo(padding, padding)
        .lineTo(padding, canvas.height - padding) 
        .moveTo(padding, canvas.height - padding)
        .lineTo(canvas.width - padding, canvas.height - padding); 
    stage.addChild(axes);
  };
  
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Financial Performance Chart</h1>
        <p className="text-gray-600 mb-6">Interactive line chart visualizing a company's stock value over time. Hover over the data points to see the specific values.</p>
        <canvas ref={canvasRef} width="800" height="400" className="w-full"></canvas>
      </div>
    </div>
  );
};

export default Chart;