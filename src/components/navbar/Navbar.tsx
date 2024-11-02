import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/icon/logo.png";
import { navMenu } from "./const";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Navbar = () => {
	const { pathname } = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className='bg-white sticky top-0 border-b-[1px] border-gray-200 px-4 md:px-12 lg:px-20 py-4 flex justify-between items-center'>
			<Link to={"/"} className='flex gap-2 items-center'>
				<section className='h-7 w-7'>
					<img
						src={logo}
						alt='logo'
						className='h-full w-full object-cover object-center'
					/>
				</section>
				<h1 className='font-medium text-sm'>SIMS PPOB</h1>
			</Link>

			{/* Desktop Menu */}
			<section className='hidden md:flex items-center gap-6'>
				{navMenu.map((menu, index) => (
					<Link
						className={`${
							menu.link === pathname
								? "text-primary"
								: "text-gray-700 hover:text-gray-800"
						} font-medium text-xs`}
						key={index}
						to={menu.link}>
						{menu.name}
					</Link>
				))}
			</section>

			<button className='md:hidden text-gray-700' onClick={toggleMenu}>
				{isMenuOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
			</button>

			<section
				className={`fixed top-0 right-0 h-full bg-white shadow-lg w-2/3 max-w-xs transition-transform ease-in-out duration-200 transform ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				} md:hidden`}>
				<div className='flex flex-col items-start p-6'>
					<div className='flex justify-between items-center w-full mb-8'>
						<button onClick={toggleMenu} className='text-gray-700'>
							<IoMdClose size={24} />
						</button>
					</div>

					<div className='flex flex-col gap-6'>
						{navMenu.map((menu, index) => (
							<Link
								className={`${
									menu.link === pathname ? "text-primary" : "text-gray-700"
								} font-medium text-sm`}
								key={index}
								to={menu.link}
								onClick={toggleMenu}>
								{menu.name}
							</Link>
						))}
					</div>
				</div>
			</section>
		</nav>
	);
};

export default Navbar;
