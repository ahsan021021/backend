import BusinessProfile from '../models/BusinessProfile.js';

// Get business profile
export const getBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update or create business profile
export const updateBusinessProfile = async (req, res) => {
  try {
    const { businessName, businessEmail, businessPhone, businessAddress, businessLogo } = req.body;
    let profile = await BusinessProfile.findOne();
    if (profile) {
      profile.businessName = businessName;
      profile.businessEmail = businessEmail;
      profile.businessPhone = businessPhone;
      profile.businessAddress = businessAddress;
      profile.businessLogo = businessLogo;
    } else {
      profile = new BusinessProfile({
        businessName,
        businessEmail,
        businessPhone,
        businessAddress,
        businessLogo,
      });
    }
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};