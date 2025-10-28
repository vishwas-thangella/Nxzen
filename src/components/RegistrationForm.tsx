import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserPlus, CheckCircle2, Plus, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase'; // You'll create this file

interface Member {
  name: string;
  email: string;
  phone: string;
  college: string;
}

const GRADIENT_COLORS = [
  'from-blue-500 to-purple-600',
  'from-purple-500 to-pink-600',
  'from-pink-500 to-red-600',
  'from-orange-500 to-yellow-600',
  'from-green-500 to-teal-600',
];

export function RegistrationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [category, setCategory] = useState('');
  const [members, setMembers] = useState<Member[]>([
    { name: '', email: '', phone: '', college: '' },
    { name: '', email: '', phone: '', college: '' },
    { name: '', email: '', phone: '', college: '' },
  ]);

  const MIN_MEMBERS = 3;
  const MAX_MEMBERS = 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate team name and category
    if (!teamName.trim()) {
      toast.error('Please enter a team name');
      return;
    }

    if (!category) {
      toast.error('Please select a category');
      return;
    }

    // Validate all members
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      
      if (!member.name.trim() || !member.email.trim() || !member.phone.trim() || !member.college.trim()) {
        toast.error(`Please fill in all fields for Member ${i + 1}`);
        return;
      }

      if (!emailRegex.test(member.email)) {
        toast.error(`Please enter a valid email address for Member ${i + 1}`);
        return;
      }
    }

    // Validate team size
    if (members.length < MIN_MEMBERS) {
      toast.error(`Team must have at least ${MIN_MEMBERS} members`);
      return;
    }

    // Submit to Firebase
    setIsSubmitting(true);
    try {
      const teamsCollection = collection(db, 'teams');
      
      const teamData = {
        teamName: teamName.trim(),
        category,
        members: members.map(member => ({
          name: member.name.trim(),
          email: member.email.trim().toLowerCase(),
          phone: member.phone.trim(),
          college: member.college.trim(),
        })),
        createdAt: serverTimestamp(),
      };

      await addDoc(teamsCollection, teamData);
      
      // Show success
      setIsSubmitted(true);
      toast.success('Registration successful! ');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setTeamName('');
        setCategory('');
        setMembers([
          { name: '', email: '', phone: '', college: '' },
          { name: '', email: '', phone: '', college: '' },
          { name: '', email: '', phone: '', college: '' },
        ]);
      }, 5000);
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddMember = () => {
    if (members.length < MAX_MEMBERS) {
      setMembers([...members, { name: '', email: '', phone: '', college: '' }]);
    }
  };

  const handleRemoveMember = (index: number) => {
    if (members.length > MIN_MEMBERS) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const handleMemberChange = (index: number, field: keyof Member, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
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
            Fill in the details for your team (Team size: {MIN_MEMBERS}-{MAX_MEMBERS} members)
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
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter your team name"
                  className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">Category *</Label>
                <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
                  <SelectTrigger className="bg-black/50 border-purple-500/30 text-white focus:border-purple-500">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="ai-ml">AI/ML</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                    <SelectItem value="iot">IoT</SelectItem>
                    <SelectItem value="open">Open Innovation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Team Members */}
              <AnimatePresence mode="popLayout">
                {members.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {index > 0 && <div className="border-t border-purple-500/20" />}
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${GRADIENT_COLORS[index % GRADIENT_COLORS.length]} rounded-lg flex items-center justify-center`}>
                          <span className="text-white">{index + 1}</span>
                        </div>
                        <h3 className="text-xl text-white">Member {index + 1} Details</h3>
                      </div>
                      {members.length > MIN_MEMBERS && (
                        <Button
                          type="button"
                          onClick={() => handleRemoveMember(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          disabled={isSubmitting}
                        >
                          <X size={18} className="mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`member${index}Name`} className="text-gray-300">Name *</Label>
                        <Input
                          id={`member${index}Name`}
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                          placeholder={`Enter member ${index + 1} name`}
                          className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`member${index}Email`} className="text-gray-300">Email *</Label>
                        <Input
                          id={`member${index}Email`}
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                          placeholder={`member${index + 1}@example.com`}
                          className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`member${index}Phone`} className="text-gray-300">Phone Number *</Label>
                        <Input
                          id={`member${index}Phone`}
                          type="tel"
                          value={member.phone}
                          onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                          placeholder="+91 XXXXXXXXXX"
                          className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`member${index}College`} className="text-gray-300">College Name *</Label>
                        <Input
                          id={`member${index}College`}
                          value={member.college}
                          onChange={(e) => handleMemberChange(index, 'college', e.target.value)}
                          placeholder="Enter college name"
                          className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add Team Member Button */}
              {members.length < MAX_MEMBERS && (
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
                    disabled={isSubmitting}
                  >
                    <Plus className="mr-2" size={20} />
                    Add Team Member ({members.length}/{MAX_MEMBERS})
                  </Button>
                </motion.div>
              )}

              {/* Divider */}
              <div className="border-t border-purple-500/20" />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2" size={20} />
                    Submit Registration
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}