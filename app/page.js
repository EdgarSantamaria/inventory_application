'use client';
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography, Modal, Stack, TextField, Button } from "@mui/material";
import { collection, query, getDocs, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    console.log(inventoryList);
  };

  const deleteItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    await deleteDoc(docRef);
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateInventory();
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      width = '100vw'
      height = '100vh'
      display = 'flex'
      flexDirection = 'column'
      justifyContent= 'center'
      alignItems = 'center'
      gap = {2}
      bgcolor={'#fcfafa'}
    >
      <Modal open={open} onClose = {handleClose}>
        <Box
          position = 'absolute'
          top = '50%'
          left = '50%'
          width = {400}
          bgcolor = 'white'
          border = '1px solid #000'
          boxShadow = {24}
          p= {4}
          display = 'flex'
          flexDirection = 'column'
          gap = {3}
          sx = {{transform : 'translate(-50%, -50%)',}}
        >
          <Stack width = "100%" direction = 'row' spacing = {2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange = {(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick = {() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Stack direction = 'row' spacing = {2}>
        <Button 
        variant="contained"
        onClick = {handleOpen}
        >Add New Item</Button>
        <Box>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search Inventory"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </Box>
      </Stack>
      <Box border = '1px solid #333'>
        <Box width = '1000px' height='100px' bgcolor='#ADD8E6' display='flex' textAlign='left' alignItems='center' pl={2}>
          <Typography variant="h4" color = '#333' display='flex' textAlign='center'>
            Item list of your inventory
          </Typography>
        </Box>
      <Stack width = '1000px' height = '500px' spacing = {.5} overflow = 'auto'>
        {inventory.filter((item) => item.name.toLowerCase().includes(searchTerm))
            .map(({ name, quantity }) => (
          <Box
            key = {name}
            width = '100%'
            minHeight= '150px'
            display = 'flex'
            alignItems= 'center'
            justifyContent='space-between'
            padding={5}
            bgcolor='#f0f0f0'
          >
            <Typography variant="h4" color='#333' textAlign='center'>
              {name.charAt(0).toUpperCase()+name.slice(1)}
            </Typography>
            <Typography variant="h4" color='#333' textAlign='center'>
              Quantity: {quantity}
            </Typography>
            <Button variant='contained' onClick={()=>{addItem(name)}}>
              Add
            </Button>
            <Button variant = 'contained' onClick ={()=>{removeItem(name)}}>
              Remove
            </Button>
            <Button variant = 'contained' color = 'error' onClick={()=>{deleteItem(name)}}>
              Delete
            </Button>
          </Box>
        ))}
      </Stack>
     </Box>
    </Box>
  )
}
