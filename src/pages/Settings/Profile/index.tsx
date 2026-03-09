import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  Flex,
  Button,
  TextField,
  TextArea,
  Avatar as RadixAvatar,
  Separator,
  Callout,
  Grid,
  Box,
} from "@radix-ui/themes";
import { FiCamera, FiUser, FiMail, FiPhone, FiBriefcase, FiMapPin } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import "./profile-page.scss";
import { useAppSelector } from "@/store/hooks";

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  location: string;
  bio: string;
}

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://img.freepik.com/premium-psd/3d-avatar-3d-cartoon-character-3d-cute-asian-woman-avatar-smiling-girl-png-illustration-website_532044-917.jpg"
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    mode: "onBlur",
    defaultValues: {
      fullName: user?.name || "Nguyễn Quốc Huy",
      email: user?.email || "huy.nguyen@hdbank.com",
      phone: "+84 987 654 321",
      jobTitle: "Senior Software Engineer",
      department: "IT Department",
      location: "Ho Chi Minh City, Vietnam",
      bio: "Passionate software engineer with 5+ years of experience in building scalable web applications.",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      console.log("Saving profile:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="profile-page">
      <Box mb="5">
        <h4 className="page-title">Profile Settings</h4>
        <Text size="2" color="gray">Manage your personal information and preferences</Text>
      </Box>

      {showSuccess && (
        <Callout.Root color="green" mb="4" variant="surface">
          <Callout.Icon>
            <IoCheckmarkCircle />
          </Callout.Icon>
          <Callout.Text>Profile updated successfully!</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid columns={{ initial: "1", md: "260px 1fr" }} gap="5">
          {/* Sidebar */}
          <Flex direction="column" gap="3">
            <Box className="profile-sidebar">
              <Flex direction="column" align="center" gap="3" p="5">
                <Box position="relative" className="avatar-container">
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <RadixAvatar
                        size="8"
                        src={avatarUrl}
                        fallback={field.value.split(" ").map((n) => n[0]).join("")}
                        radius="full"
                        className="profile-avatar"
                      />
                    )}
                  />
                  <label htmlFor="avatar-upload" className="avatar-overlay">
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      style={{ display: "none" }}
                    />
                    <Flex align="center" justify="center" className="camera-icon">
                      <FiCamera size={14} color="white" />
                    </Flex>
                  </label>
                </Box>

                <Flex direction="column" align="center" gap="1">
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <Text size="4" weight="bold" align="center">{field.value}</Text>
                    )}
                  />
                  <Controller
                    name="jobTitle"
                    control={control}
                    render={({ field }) => (
                      <Text size="2" color="gray" align="center">{field.value}</Text>
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Text size="1" color="gray" align="center">{field.value}</Text>
                    )}
                  />
                </Flex>

                <Separator size="4" />

                <Flex direction="column" gap="2" width="100%">
                  <Controller
                    name="department"
                    control={control}
                    render={({ field }) => (
                      <Flex align="center" gap="2" className="info-row">
                        <FiBriefcase size={14} className="info-icon" />
                        <Text size="2" color="gray">{field.value}</Text>
                      </Flex>
                    )}
                  />
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Flex align="center" gap="2" className="info-row">
                        <FiMapPin size={14} className="info-icon" />
                        <Text size="2" color="gray">{field.value}</Text>
                      </Flex>
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Flex align="center" gap="2" className="info-row">
                        <FiPhone size={14} className="info-icon" />
                        <Text size="2" color="gray">{field.value}</Text>
                      </Flex>
                    )}
                  />
                </Flex>

                <Button size="2" variant="soft" style={{ width: "100%" }} asChild>
                  <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
                    <FiCamera size={14} /> Change Photo
                  </label>
                </Button>
              </Flex>
            </Box>
          </Flex>

          {/* Form */}
          <Flex direction="column" gap="4">
            {/* Personal Information */}
            <Box className="form-card">
              <Box className="form-card-header">
                <Flex align="center" gap="2">
                  <FiUser className="section-icon" size={15} />
                  <Text size="3" weight="bold">Personal Information</Text>
                </Flex>
              </Box>
              <Box className="form-card-body">
                <Grid columns={{ initial: "1", sm: "2" }} gap="4">
                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: "Full name is required", minLength: { value: 2, message: "Min 2 chars" } }}
                    render={({ field }) => (
                      <Box>
                        <Text as="div" size="2" mb="1" weight="medium">Full Name <Text color="red">*</Text></Text>
                        <TextField.Root size="2" {...field} placeholder="John Doe" color={errors.fullName ? "red" : undefined}>
                          <TextField.Slot><FiUser size={13} /></TextField.Slot>
                        </TextField.Root>
                        {errors.fullName && <Text color="red" size="1">{errors.fullName.message}</Text>}
                      </Box>
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } }}
                    render={({ field }) => (
                      <Box>
                        <Text as="div" size="2" mb="1" weight="medium">Email <Text color="red">*</Text></Text>
                        <TextField.Root size="2" {...field} placeholder="john@example.com" color={errors.email ? "red" : undefined}>
                          <TextField.Slot><FiMail size={13} /></TextField.Slot>
                        </TextField.Root>
                        {errors.email && <Text color="red" size="1">{errors.email.message}</Text>}
                      </Box>
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <Text as="div" size="2" mb="1" weight="medium">Phone Number</Text>
                        <TextField.Root size="2" {...field} placeholder="+1 234 567 890">
                          <TextField.Slot><FiPhone size={13} /></TextField.Slot>
                        </TextField.Root>
                      </Box>
                    )}
                  />
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <Text as="div" size="2" mb="1" weight="medium">Location</Text>
                        <TextField.Root size="2" {...field} placeholder="City, Country">
                          <TextField.Slot><FiMapPin size={13} /></TextField.Slot>
                        </TextField.Root>
                      </Box>
                    )}
                  />
                </Grid>
              </Box>
            </Box>

            {/* Professional Information */}
            <Box className="form-card">
              <Box className="form-card-header">
                <Flex align="center" gap="2">
                  <FiBriefcase className="section-icon" size={15} />
                  <Text size="3" weight="bold">Professional Information</Text>
                </Flex>
              </Box>
              <Box className="form-card-body">
                <Grid columns={{ initial: "1", sm: "2" }} gap="4">
                  <Controller
                    name="jobTitle"
                    control={control}
                    rules={{ required: "Job title is required" }}
                    render={({ field }) => (
                      <Box>
                        <Text as="div" size="2" mb="1" weight="medium">Job Title <Text color="red">*</Text></Text>
                        <TextField.Root size="2" {...field} placeholder="Software Engineer" color={errors.jobTitle ? "red" : undefined} />
                        {errors.jobTitle && <Text color="red" size="1">{errors.jobTitle.message}</Text>}
                      </Box>
                    )}
                  />
                  <Controller
                    name="department"
                    control={control}
                    rules={{ required: "Department is required" }}
                    render={({ field }) => (
                      <Box>
                        <Text as="div" size="2" mb="1" weight="medium">Department <Text color="red">*</Text></Text>
                        <TextField.Root size="2" {...field} placeholder="Engineering" color={errors.department ? "red" : undefined} />
                        {errors.department && <Text color="red" size="1">{errors.department.message}</Text>}
                      </Box>
                    )}
                  />
                </Grid>
              </Box>
            </Box>

            {/* Bio */}
            <Box className="form-card">
              <Box className="form-card-header">
                <Text size="3" weight="bold">Bio</Text>
              </Box>
              <Box className="form-card-body">
                <Controller
                  name="bio"
                  control={control}
                  rules={{ maxLength: { value: 500, message: "Max 500 chars" } }}
                  render={({ field }) => (
                    <Box>
                      <TextArea size="2" {...field} placeholder="Tell us a little bit about yourself..." rows={4} style={{ resize: "vertical" }} />
                      <Flex justify="end" mt="1"><Text size="1" color="gray">{field.value?.length || 0}/500</Text></Flex>
                      {errors.bio && <Text color="red" size="1">{errors.bio.message}</Text>}
                    </Box>
                  )}
                />
              </Box>
            </Box>

            <Flex gap="3" justify="end">
              <Button variant="soft" color="gray" size="2" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="2" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </Flex>
          </Flex>
        </Grid>
      </form>
    </div>
  );
}
