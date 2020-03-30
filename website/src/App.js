import React from 'react';
import { Form, Select, InputNumber, DatePicker, Switch, Slider, Button, Typography } from 'antd';
import Friwords from './pages/Friwords';

// CSS Files
import './App.css';
import './assets/css/friwords.css';

const { Option } = Select;
const { Title } = Typography;

const App = () => (
    <Friwords />
);

export default App;
