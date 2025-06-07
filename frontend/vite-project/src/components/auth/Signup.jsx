import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { setLoading } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react'


const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    password: '',
    role: 'student',
    file: '',
  });
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phonenumber', input.phonenumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form
          onSubmit={submitHandler}
          className='w-1/2 border border-gray-300 rounded-md p-4 my-10 shadow-sm'
        >
          <h1 className='font-bold text-xl mb-5'>Sign up</h1>

          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type='text'
              value={input.fullname}
              name='fullname'
              onChange={changeEventHandler}
              placeholder='Chakor'
              required
            />
          </div>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type='email'
              value={input.email}
              name='email'
              onChange={changeEventHandler}
              placeholder='chakor@gmail.com'
              required
            />
          </div>

          <div className='my-2'>
            <Label>Phone number</Label>
            <Input
              type='text'
              value={input.phonenumber}
              name='phonenumber'
              onChange={changeEventHandler}
              placeholder='8080808080'
              required
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type='password'
              value={input.password}
              name='password'
              onChange={changeEventHandler}
              placeholder='Your password'
              required
            />
          </div>

          <div className='my-4'>
            <Label>Role</Label>
            <div className='flex gap-6'>
              <div className='flex items-center space-x-2'>
                <Input
                  type='radio'
                  name='role'
                  value='student'
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                />
                <Label htmlFor='student'>Student</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Input
                  type='radio'
                  name='role'
                  value='Recruiter'
                  checked={input.role === 'Recruiter'}
                  onChange={changeEventHandler}
                />
                <Label htmlFor='recruiter'>Recruiter</Label>
              </div>
              <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
            </div>
            </div>
            
          </div>


           {
                                  loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
                              }

          <span className='text-sm'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-600'>
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
