import { FC, ReactElement, useEffect, useRef } from "react";
import Navbar from "../../components/navbar/Navbar";
import { MdAlternateEmail } from "react-icons/md";
import Button from "../../components/button/Button";
import { useProfile } from "../profile/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileValidationSchema } from "./validation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateProfile, useUpdateProfileImage } from "./api";
import useCustomSnackbar from "../../hooks/useSnackBar";
import { defaultImageUrl } from "../../services/const";
import Avatar from "react-avatar";
import { GoPencil } from "react-icons/go";
import { IoMdPerson } from "react-icons/io";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSelectedService } from "../../store/service-slice/ServiceSlice";

const AccountPage: FC = (): ReactElement => {
	const { data, refetch } = useProfile();
	const { mutate } = useUpdateProfile();
	const navigate = useNavigate();
	const { mutate: updateImage } = useUpdateProfileImage();
	const customEnqueueSnackbar = useCustomSnackbar();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	type UpdateProfileValidationSchema = z.infer<
		typeof updateProfileValidationSchema
	>;

	const {
		register,
		formState: { isValid, errors },
		handleSubmit,
		reset,
	} = useForm<UpdateProfileValidationSchema>({
		resolver: zodResolver(updateProfileValidationSchema),
		mode: "onChange",
	});

	useEffect(() => {
		if (data) {
			reset({
				email: data.email,
				first_name: data.first_name,
				last_name: data.last_name,
			});
		}
	}, [reset, data]);

	const handleUpdateProfile = handleSubmit((data) => {
		mutate(data, {
			onError: (error) => {
				customEnqueueSnackbar(
					(error?.response?.data?.message as string) || "Terjadi Kesalahan",
					"error"
				);
			},
			onSuccess: (data) => {
				customEnqueueSnackbar(
					data?.message || "Berhasil Update Profile",
					"success"
				);
				refetch();
			},
		});
	});

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			if (file.size > 100 * 1024) {
				customEnqueueSnackbar("File size must be less than 100 KB", "error");
				return;
			}

			if (!["image/jpeg", "image/png"].includes(file.type)) {
				customEnqueueSnackbar("Only JPG and PNG files are accepted", "error");
				return;
			}

			updateImage(
				{
					file,
				},
				{
					onError: (error) => {
						customEnqueueSnackbar(
							(error?.response?.data?.message as string) || "Terjadi Kesalahan",
							"error"
						);
					},
					onSuccess: (data) => {
						customEnqueueSnackbar(
							data?.message || "Berhasil Update Image",
							"success"
						);
						refetch();
					},
				}
			);
		}
	};

	const handlePencilClick = () => {
		fileInputRef.current?.click();
	};
	const dispatch = useDispatch();

	const handleLogout = () => {
		Cookies.remove("SIMS-PPOB-MARIO");
		dispatch(clearSelectedService());
		navigate("/auth/login");
	};

	return (
		<>
			<Navbar />
			<section className='px-4 md:px-12 lg:px-20 grid place-items-center'>
				<section className='px-6 py-8 shadow-sm flex flex-col gap-6 md:gap-10 w-full md:min-w-[520px] md:max-w-[560px]'>
					<section className='grid place-items-center'>
						<section className='bg-gray-100 border-2 border-gray-100 h-28 w-28 relative rounded-full'>
							{data?.profile_image &&
							data?.profile_image !== defaultImageUrl ? (
								<img
									src={data?.profile_image}
									alt={`${data?.first_name} ${data?.last_name}`}
									className='h-full w-full rounded-full object-cover'
								/>
							) : (
								<Avatar
									className='h-full w-full rounded-full object-cover'
									size='100%'
									color='#f4251b'
									alt='user-icon'
									name={`${data?.first_name || ""} ${data?.last_name || ""}`}
								/>
							)}
							<section
								className='h-7 w-7 absolute bottom-0 right-1 rounded-full grid place-items-center bg-gray-100 border-2 border-gray-50 text-gray-500 text-lg cursor-pointer'
								onClick={handlePencilClick}>
								<GoPencil />
							</section>
							<input
								type='file'
								ref={fileInputRef}
								className='hidden'
								accept='image/png, image/jpeg'
								onChange={handleImageChange}
							/>
						</section>
					</section>
					<form
						onSubmit={handleUpdateProfile}
						className='flex flex-col gap-4 md:mt-6'>
						<section className='flex flex-col gap-2'>
							<label
								htmlFor='email'
								className='text-sm text-gray-700 font-medium'>
								Email
							</label>
							<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
								<MdAlternateEmail className='text-gray-400' />
								<input
									id='email'
									type='email'
									placeholder='Masukan email anda'
									{...register("email")}
									className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'
								/>
							</div>
							{errors.email && (
								<p className='text-red-500 text-xs'>{errors.email.message}</p>
							)}
						</section>

						<section className='flex flex-col gap-2'>
							<label
								htmlFor='first_name'
								className='text-sm text-gray-700 font-medium'>
								Nama Depan
							</label>
							<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
								<IoMdPerson className='text-gray-400' />
								<input
									id='first_name'
									type='text'
									placeholder='Masukan Nama Depan'
									{...register("first_name")}
									className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'
								/>
							</div>
							{errors.first_name && (
								<p className='text-red-500 text-xs'>
									{errors.first_name.message}
								</p>
							)}
						</section>

						<section className='flex flex-col gap-2'>
							<label
								htmlFor='last_name'
								className='text-sm text-gray-700 font-medium'>
								Nama Belakang
							</label>
							<div className='flex items-center gap-2 border-[1px] px-4 py-2 rounded-md'>
								<IoMdPerson className='text-gray-400' />
								<input
									id='last_name'
									type='text'
									placeholder='Masukan Nama Belakang'
									{...register("last_name")}
									className='text-xs md:text-sm text-gray-500 border-none outline-none placeholder:text-gray-400 w-full bg-transparent'
								/>
							</div>
							{errors.last_name && (
								<p className='text-red-500 text-xs'>
									{errors.last_name.message}
								</p>
							)}
						</section>

						<section className='mt-2 md:mt-4'>
							<section className='flex flex-col gap-2 md:gap-4'>
								<Button variant='secondary' type='submit' disabled={!isValid}>
									Edit Profil
								</Button>
								<Button variant='primary' type='button' onClick={handleLogout}>
									Logout
								</Button>
							</section>
						</section>
					</form>
				</section>
			</section>
		</>
	);
};

export default AccountPage;
