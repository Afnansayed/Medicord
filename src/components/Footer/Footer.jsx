import { FaFacebook, FaLinkedin } from 'react-icons/fa6';
import logo from '../../assets/cover.png'
import { FaInstagramSquare } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="px-4 divide-y dark:bg-gray-100 dark:text-gray-800 mt-12">
	<div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
		<div className="lg:w-1/3">
			<a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
				<div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-600 bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url(${logo})`}}>
				</div>
				<span className="self-center text-2xl font-semibold">Brand name</span>
			</a>
		</div>
		<div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
			<div className="space-y-3">
				<h3 className="tracking-wide uppercase dark:text-gray-900">Product</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="#">Features</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">Integrations</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">Pricing</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">FAQ</a>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<h3 className="tracking-wide uppercase dark:text-gray-900">Company</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="#">Privacy</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">Terms of Service</a>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<h3 className="uppercase dark:text-gray-900">Developers</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="#">Public API</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">Documentation</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">Guides</a>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<div className="uppercase dark:text-gray-900">Social media</div>
				<div className="flex justify-start space-x-3">
					<a rel="noopener noreferrer" href="https://www.facebook.com/zofaf.razin?mibextid=ZbWKwL" title="Facebook" className="flex items-center p-1">
                    <FaFacebook className='text-2xl text-[#181ed5]' />
					</a>
					<a rel="noopener noreferrer" href="https://www.linkedin.com/in/afnan-sayed-razin" title="Twitter" className="flex items-center p-1">
                    <FaLinkedin  className='text-2xl text-[#181ed5]'/>
					</a>
					<a rel="noopener noreferrer" href="https://www.instagram.com/mdbin_razin?igsh=bnZydHFjbG54em44" title="Instagram" className="flex items-center p-1">
                    <FaInstagramSquare className='text-2xl text-[#181ed5]' />
					</a>
				</div>
			</div>
		</div>
	</div>
	<div className="py-6 text-sm text-center dark:text-gray-600">© 1968 Company Co. All rights reserved.</div>
</footer>
    );
};

export default Footer;