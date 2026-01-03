import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  Heading,
  Text,
  Flex,
  Button,
  TextField,
  TextArea,
  Avatar as RadixAvatar,
  Separator,
  Callout,
} from "@radix-ui/themes";
import { FiUpload } from "react-icons/fi";
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
    mode: "onBlur", // Validate on blur
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
      // TODO: Implement API call to save profile
      console.log("Saving profile:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
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
      <Flex justify="between" align="center" mb="5">
        <div>
          <Heading size="6" mb="1">
            Profile Settings
          </Heading>
          <Text color="gray" size="2">
            Manage your personal information and preferences
          </Text>
        </div>
      </Flex>

      {showSuccess && (
        <Callout.Root color="green" mb="4">
          <Callout.Icon>
            <IoCheckmarkCircle />
          </Callout.Icon>
          <Callout.Text>Profile updated successfully!</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="4" direction={{ initial: "column", md: "row" }}>
          {/* Avatar Section */}
          <Card className="profile-avatar-card">
            <Flex direction="column" align="center" gap="4">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <RadixAvatar
                    size="9"
                    src={avatarUrl}
                    fallback={field.value
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                    radius="full"
                  />
                )}
              />
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Flex direction="column" align="center" gap="2">
                    <Text size="2" weight="medium" align="center">
                      {field.value}
                    </Text>
                  </Flex>
                )}
              />
              <Controller
                name="jobTitle"
                control={control}
                render={({ field }) => (
                  <Text size="1" color="gray" align="center">
                    {field.value}
                  </Text>
                )}
              />
              <label htmlFor="avatar-upload" className="upload-avatar-btn">
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
                <Button size="2" variant="soft" type="button" style={{ cursor: "pointer" }}>
                  <FiUpload size={16} />
                  Change Avatar
                </Button>
              </label>
            </Flex>
          </Card>

        {/* Form Section */}
          <Card style={{ flex: 1 }}>
            <Flex direction="column" gap="4">
              <div>
                <Heading size="4" mb="3">
                  Personal Information
                </Heading>
                <Separator size="4" mb="4" />
              </div>

              <Flex direction="column" gap="4">
                <Controller
                  name="fullName"
                  control={control}
                  rules={{
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  }}
                  render={({ field }) => (
                    <label>
                      <Text size="2" weight="medium" mb="2" as="div">
                        Full Name <Text color="red">*</Text>
                      </Text>
                      <TextField.Root
                        size="3"
                        {...field}
                        placeholder="Enter your full name"
                        color={errors.fullName ? "red" : undefined}
                      />
                      {errors.fullName && (
                        <Text size="1" color="red" mt="1">
                          {errors.fullName.message}
                        </Text>
                      )}
                    </label>
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <label>
                      <Text size="2" weight="medium" mb="2" as="div">
                        Email <Text color="red">*</Text>
                      </Text>
                      <TextField.Root
                        size="3"
                        type="email"
                        {...field}
                        placeholder="Enter your email"
                        color={errors.email ? "red" : undefined}
                      />
                      {errors.email && (
                        <Text size="1" color="red" mt="1">
                          {errors.email.message}
                        </Text>
                      )}
                    </label>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                      message: "Invalid phone number",
                    },
                  }}
                  render={({ field }) => (
                    <label>
                      <Text size="2" weight="medium" mb="2" as="div">
                        Phone Number
                      </Text>
                      <TextField.Root
                        size="3"
                        type="tel"
                        {...field}
                        placeholder="Enter your phone number"
                        color={errors.phone ? "red" : undefined}
                      />
                      {errors.phone && (
                        <Text size="1" color="red" mt="1">
                          {errors.phone.message}
                        </Text>
                      )}
                    </label>
                  )}
                />

                <Flex gap="3">
                  <Controller
                    name="jobTitle"
                    control={control}
                    rules={{
                      required: "Job title is required",
                    }}
                    render={({ field }) => (
                      <label style={{ flex: 1 }}>
                        <Text size="2" weight="medium" mb="2" as="div">
                          Job Title <Text color="red">*</Text>
                        </Text>
                        <TextField.Root
                          size="3"
                          {...field}
                          placeholder="Enter your job title"
                          color={errors.jobTitle ? "red" : undefined}
                        />
                        {errors.jobTitle && (
                          <Text size="1" color="red" mt="1">
                            {errors.jobTitle.message}
                          </Text>
                        )}
                      </label>
                    )}
                  />

                  <Controller
                    name="department"
                    control={control}
                    rules={{
                      required: "Department is required",
                    }}
                    render={({ field }) => (
                      <label style={{ flex: 1 }}>
                        <Text size="2" weight="medium" mb="2" as="div">
                          Department <Text color="red">*</Text>
                        </Text>
                        <TextField.Root
                          size="3"
                          {...field}
                          placeholder="Enter your department"
                          color={errors.department ? "red" : undefined}
                        />
                        {errors.department && (
                          <Text size="1" color="red" mt="1">
                            {errors.department.message}
                          </Text>
                        )}
                      </label>
                    )}
                  />
                </Flex>

                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <label>
                      <Text size="2" weight="medium" mb="2" as="div">
                        Location
                      </Text>
                      <TextField.Root
                        size="3"
                        {...field}
                        placeholder="Enter your location"
                      />
                    </label>
                  )}
                />

                <Controller
                  name="bio"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 500,
                      message: "Bio must be less than 500 characters",
                    },
                  }}
                  render={({ field }) => (
                    <label>
                      <Text size="2" weight="medium" mb="2" as="div">
                        Bio
                      </Text>
                      <TextArea
                        size="3"
                        {...field}
                        placeholder="Tell us about yourself"
                        rows={4}
                        color={errors.bio ? "red" : undefined}
                      />
                      {errors.bio && (
                        <Text size="1" color="red" mt="1">
                          {errors.bio.message}
                        </Text>
                      )}
                    </label>
                  )}
                />
              </Flex>

              <Separator size="4" />

              <Flex gap="3" justify="end">
                <Button variant="soft" color="gray" size="3" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="3" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </form>
    </div>
  );
}
