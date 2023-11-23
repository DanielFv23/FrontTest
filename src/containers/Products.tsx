import React, {useState, useEffect} from 'react';
import {Button, Card, Col, Input, InputNumber, Layout, List, Menu, MenuProps, Row, Select, Typography} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const {Header, Content, Footer} = Layout;
const { Option } = Select;

const items1: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a href="/" rel="noopener noreferrer">
        Home
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a href="/products" rel="noopener noreferrer">
       Productos
      </a>
    ),
  }
]

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [number, setNumber] = useState<number | null | string>(null);
  const [operator, setOperator] = useState('equal');
  const [products, setProducts] = useState([]); // Aquí guardas los productos que obtienes de la petición

  useEffect(() => {
      // Realiza la petición a tu servicio local cuando selectedState cambia
      axios.get(`${process.env.REACT_APP_API_URL}/product`)
        .then(response => {
          // Maneja la respuesta aquí
          setProducts(response?.data?.result?.items || [])
          console.log(response.data);
        })
        .catch(error => {
          // Maneja el error aquí
          console.error('Error al obtener los datos:', error);
        });
  }, []);

  const handleSearch = () => {
    console.log(text, number, operator);
    axios.get(`${process.env.REACT_APP_API_URL}/product/search`, {
      params: {
        searchText: text,
        price: number,
        operator: operator
      }
    })
      .then(response => {
        // Maneja la respuesta aquí
        setProducts(response?.data?.result?.items || [])
        console.log(response.data);
      })
      .catch(error => {
        // Maneja el error aquí
        console.error('Error al obtener los datos:', error);
      });
  };

  const selectAfter = (
    <Select defaultValue="equal" onChange={(e) => setOperator(e)}>
      <Option value="more">Mayor que</Option>
      <Option value="less">Menor que</Option>
      <Option value="equal">Igual que</Option>
    </Select>
  );

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Header style={{display: 'flex', alignItems: 'center'}}>
        <div className="demo-logo"/>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} onClick={(e) => {
          console.log(e);
        }}/>
      </Header>
      <Layout>
        <Content style={{padding: 36, textAlign: 'center', maxWidth: 1320, alignSelf: 'center'}}>
          <Typography>
            Busca lo que quieras y cambialo facilmente
          </Typography>
          <Row style={{ placeContent: 'center'}} gutter={12}>
            <Col>
              <Input placeholder="Ingrese texto" style={{ width: '100%'}} onChange={e => setText(e.target.value)} />
            </Col>
            <Col>
              <InputNumber placeholder="Ingrese precio" addonAfter={selectAfter} defaultValue="" onChange={value => setNumber(value)}  />
            </Col>
            <Col>
              <Button
                icon={<SearchOutlined/>}
                onClick={handleSearch}
                type="primary">Buscar</Button>
            </Col>
            <Col span={24}>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                }}
                dataSource={products}
                renderItem={(item: any) => (
                  <List.Item>
                    <Card
                      hoverable
                      style={{ width: '100%' }}
                      cover={<img alt="example" src={item.image} height={250}/>}
                      actions={[
                        <Button type="primary">
                          Seleccionar
                        </Button>
                      ]}
                      bodyStyle={{
                        padding: 0,
                        margin: '5px 10px'
                      }}
                    >
                      <Typography.Paragraph ellipsis={true}  style={{ textAlign: 'start', fontSize: 14, opacity: 0.5  }}>{item.name || 'Pantalones'}</Typography.Paragraph>
                      <Typography.Paragraph ellipsis={true}  style={{ textAlign: 'start', fontSize: 14, fontWeight: 'bold' }}>${item?.price}</Typography.Paragraph>
                    </Card>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Prueba ©2023 Created </Footer>
    </Layout>
  );
};

export default LandingPage;

