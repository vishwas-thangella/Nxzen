import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserPlus, CheckCircle2, Plus, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function RegistrationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMember2, setShowMember2] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    member1Name: '',
    member1Email: '',
    member1Phone: '',
    member1College: '',
    member2Name: '',
    member2Email: '',
    member2Phone: '',
    member2College: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for required fields
    if (!formData.teamName || !formData.member1Name || !formData.member1Email || !formData.member1Phone || 
        !formData.member1College || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation for member 1
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.member1Email)) {
      toast.error('Please enter a valid email address for Member 1');
      return;
    }

    // Validation for member 2 if shown
    if (showMember2) {
      if (!formData.member2Name || !formData.member2Email || !formData.member2Phone || !formData.member2College) {
        toast.error('Please fill in all team member details');
        return;
      }
      if (!emailRegex.test(formData.member2Email)) {
        toast.error('Please enter a valid email address for Member 2');
        return;
      }
    }

    // Show success
    setIsSubmitted(true);
    toast.success('Registration successful! Check your email for confirmation.');
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setShowMember2(false);
      setFormData({
        teamName: '',
        member1Name: '',
        member1Email: '',
        member1Phone: '',
        member1College: '',
        member2Name: '',
        member2Email: '',
        member2Phone: '',
        member2College: '',
        category: '',
      });
    }, 5000);
  };

  const handleAddMember = () => {
    setShowMember2(true);
  };

  const handleRemoveMember = () => {
    setShowMember2(false);
    setFormData(prev => ({
      ...prev,
      member2Name: '',
      member2Email: '',
      member2Phone: '',
      member2College: '',
    }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="register" className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500/50 p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-3xl text-white mb-4">Registration Successful!</h2>
              <p className="text-lg text-gray-300 mb-2">
                Thank you for registering for Nxzen Hackathon 2025!
              </p>
              <p className="text-gray-400">
                You'll receive a confirmation email shortly with further instructions.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-black" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Register Your Team
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Fill in the details for your team (Team size: 1-2 members)
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/40 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Team Name */}
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-gray-300">Team Name *</Label>
                <Input
                  id="teamName"
                  value={formData.teamName}
                  onChange={(e) => handleChange('teamName', e.target.value)}
                  placeholder="Enter your team name"
                  className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                  required
                />
              </div>

              {/* Member 1 Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white">1</span>
                  </div>
                  <h3 className="text-xl text-white">Member 1 Details</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="member1Name" className="text-gray-300">Name *</Label>
                    <Input
                      id="member1Name"
                      value={formData.member1Name}
                      onChange={(e) => handleChange('member1Name', e.target.value)}
                      placeholder="Enter member 1 name"
                      className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="member1Email" className="text-gray-300">Email *</Label>
                    <Input
                      id="member1Email"
                      type="email"
                      value={formData.member1Email}
                      onChange={(e) => handleChange('member1Email', e.target.value)}
                      placeholder="member1@example.com"
                      className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="member1Phone" className="text-gray-300">Phone Number *</Label>
                    <Input
                      id="member1Phone"
                      type="tel"
                      value={formData.member1Phone}
                      onChange={(e) => handleChange('member1Phone', e.target.value)}
                      placeholder="+91 XXXXXXXXXX"
                      className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="member1College" className="text-gray-300">College Name *</Label>
                    <Input
                      id="member1College"
                      value={formData.member1College}
                      onChange={(e) => handleChange('member1College', e.target.value)}
                      placeholder="Enter college name"
                      className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Add Team Member Button */}
              {!showMember2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    type="button"
                    onClick={handleAddMember}
                    variant="outline"
                    className="w-full border-2 border-purple-500/40 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/60 py-6"
                  >
                    <Plus className="mr-2" size={20} />
                    Add Team Member
                  </Button>
                </motion.div>
              )}

              {/* Member 2 Section */}
              {showMember2 && (
                <>
                  {/* Divider */}
                  <div className="border-t border-purple-500/20" />

                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <span className="text-white">2</span>
                        </div>
                        <h3 className="text-xl text-white">Member 2 Details</h3>
                      </div>
                      <Button
                        type="button"
                        onClick={handleRemoveMember}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <X size={18} className="mr-1" />
                        Remove
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="member2Name" className="text-gray-300">Name *</Label>
                        <Input
                          id="member2Name"
                          value={formData.member2Name}
                          onChange={(e) => handleChange('member2Name', e.target.value)}
                          placeholder="Enter member 2 name"
                          className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                          required={showMember2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="member2Email" className="text-gray-300">Email *</Label>
                        <Input
                          id="member2Email"
                          type="email"
                          value={formData.member2Email}
                          onChange={(e) => handleChange('member2Email', e.target.value)}
                          placeholder="member2@example.com"
                          className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                          required={showMember2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="member2Phone" className="text-gray-300">Phone Number *</Label>
                        <Input
                          id="member2Phone"
                          type="tel"
                          value={formData.member2Phone}
                          onChange={(e) => handleChange('member2Phone', e.target.value)}
                          placeholder="+91 XXXXXXXXXX"
                          className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                          required={showMember2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="member2College" className="text-gray-300">College Name *</Label>
                        <Input
                          id="member2College"
                          value={formData.member2College}
                          onChange={(e) => handleChange('member2College', e.target.value)}
                          placeholder="Enter college name"
                          className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                          required={showMember2}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <div className="border-t border-purple-500/20" />
                </>
              )}

              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">Round 1 Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                  <SelectTrigger className="bg-black/50 border-purple-500/30 text-white focus:border-purple-500">
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-500/30">
                    <SelectItem value="graph">Graph Isolation</SelectItem>
                    <SelectItem value="anomaly">Anomaly Detection</SelectItem>
                    <SelectItem value="integration">Integration Mini-App</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300"
              >
                <UserPlus className="mr-2" size={20} />
                Submit Registration
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
