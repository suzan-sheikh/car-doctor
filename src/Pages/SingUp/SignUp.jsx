import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import UseAuth from '../../Hook/UseAuth';

const SignUp = () => {

    const {createUser} =  UseAuth();

    const handSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password =  form.email.value;

        createUser(email, password)
        .then(result => {
            const registerUser = result.user;
            console.log(registerUser);
        })
        .catch(error => console.log(error))

    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2 mr-12">
                        <img src={img} alt="login image" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form  onSubmit={handSignUp} className="card-body">
                            <h1 className="text-5xl text-center font-bold">Sign Up</h1>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                            <input className='btn btn-primary' type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>Already have A Account  <Link className='text-orange-600 font-bold' to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default SignUp;